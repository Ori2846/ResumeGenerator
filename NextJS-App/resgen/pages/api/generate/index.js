import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import os from 'os';
import Mustache from 'mustache';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    let latexTemplatePath;
    if (data.template === 'template1') {
      latexTemplatePath = path.resolve(process.cwd(), 'public', 'template1.tex');
    } else if (data.template === 'template2') {
      latexTemplatePath = path.resolve(process.cwd(), 'public', 'template2.tex');
    } else {
      console.log('Invalid template selected:', data.template);
      return res.status(400).json({ error: 'Invalid template selected' });
    }

    console.log('Using template:', latexTemplatePath);

    // Use OS temp directory
    const tempDir = os.tmpdir();
    const texFilePath = path.join(tempDir, 'resume_output.tex');
    const pdfFilePath = path.join(tempDir, 'resume_output.pdf');

    try {
      const latexTemplate = await readFile(latexTemplatePath, 'utf8');

      const renderData = {
        ...data,
        education: data.education || [],
        experience: (data.experience || []).map(exp => ({
          ...exp,
          responsibilities: exp.responsibilities.filter(resp => resp),
        })),
        projects: (data.projects || []).map(proj => ({
          ...proj,
          details: proj.details.filter(detail => detail),
          isDotted: proj.detailDisplay === 'dotted',
          link: proj.link || '',
        })),
        skills: (data.skills || []).map(skill => ({
          ...skill,
          details: skill.details.filter(detail => detail),
        })),
        sectionOrder: data.sectionOrder.map(section => ({
          isSummary: section === 'summary',
          isEducation: section === 'education',
          isExperience: section === 'experience',
          isProjects: section === 'projects',
          isSkills: section === 'skills'
        }))
      };

      const renderedLatex = Mustache.render(latexTemplate, renderData);

      console.log('Rendered LaTeX:', renderedLatex);

      await writeFile(texFilePath, renderedLatex);

      await new Promise((resolve, reject) => {
        const process = spawn('xelatex', ['-interaction=nonstopmode', '-output-directory', tempDir, texFilePath]);

        let output = '';
        process.stdout.on('data', (data) => {
          output += data.toString();
        });

        process.stderr.on('data', (data) => {
          output += data.toString();
        });

        process.on('error', (err) => {
          reject(new Error(`Failed to start XeLaTeX process: ${err.message}`));
        });

        process.on('close', (code) => {
          console.log('XeLaTeX process finished with code', code);
          if (code !== 0 && !fs.existsSync(pdfFilePath)) {
            console.error('XeLaTeX process output:', output);
            reject(new Error(`XeLaTeX process exited with code ${code}. Output: ${output}`));
            return;
          }
          resolve();
        });
      });

      if (fs.existsSync(pdfFilePath)) {
        console.log('PDF file exists:', pdfFilePath);
        return res.status(200).json({
          pdfUrl: `/api/download?filePath=${encodeURIComponent(pdfFilePath)}&${new Date().getTime()}`,
          latexSource: renderedLatex
        });
      } else {
        throw new Error('PDF was not generated. Check the LaTeX template and XeLaTeX output for errors.');
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: error.message });
    } finally {
      try {
        await unlink(texFilePath);
      } catch (error) {
        // File might not exist, ignore
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
