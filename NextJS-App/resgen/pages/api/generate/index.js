//api/generate/index.js
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
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

    const texFilePath = path.resolve(process.cwd(), 'public', 'resume_output.tex');
    const pdfFilePath = path.resolve(process.cwd(), 'public', 'resume_output.pdf');

    try {
      const latexTemplate = await readFile(latexTemplatePath, 'utf8');

      const renderedLatex = Mustache.render(latexTemplate, {
        ...data,
        education: data.education || [],
        experience: (data.experience || []).map(exp => ({
          ...exp,
          responsibilities: exp.responsibilities.filter(resp => resp),
        })),
        projects: (data.projects || []).map(proj => ({
          ...proj,
          details: proj.details.filter(detail => detail),
          isDotted: proj.detailDisplay === 'dotted', // Set isDotted based on detailDisplay
        })),
        skills: (data.skills || []).map(skill => ({
          ...skill,
          details: skill.details.filter(detail => detail),
        })),
      });

      console.log('Rendered LaTeX before replacement:', renderedLatex);

      const finalLatex = renderedLatex
      .replace(/\\slash\{\}/g, '/')
      .replace(/x2F;/g, '/')
      .replace(/&amp;/g, '\&')  // Ensure &amp; is handled
      .replace(/&/g, '\&')      // Replace all & with \&
      //.replace(/\\\\/g, '\\textbackslash{}'); // Replace double backslash with \textbackslash{}
    
    console.log('Rendered LaTeX after replacement:', finalLatex);

      await writeFile(texFilePath, finalLatex);

      await new Promise((resolve, reject) => {
        const process = spawn('xelatex', ['-interaction=nonstopmode', '-output-directory=public', texFilePath]);

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
          pdfUrl: `/resume_output.pdf?${new Date().getTime()}`,  // Append timestamp to URL to force update
          latexSource: finalLatex // Return LaTeX source
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
