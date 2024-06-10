import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Mustache from 'mustache';
import { NextResponse } from 'next/server';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

export async function POST(req) {
  const data = await req.json();

  let latexTemplatePath;
  if (data.template === 'template1') {
    latexTemplatePath = path.resolve('public', 'template1.tex');
  } else if (data.template === 'template2') {
    latexTemplatePath = path.resolve('public', 'template2.tex');
  } else {
    console.log('Invalid template selected:', data.template);
    return NextResponse.json({ error: 'Invalid template selected' }, { status: 400 });
  }

  console.log('Using template:', latexTemplatePath);

  const texFilePath = path.resolve('public', 'resume_output.tex');
  const pdfFilePath = path.resolve('public', 'resume_output.pdf');

  try {
    const latexTemplate = await readFile(latexTemplatePath, 'utf8');

    const skills = [];
    let skillIndex = 0;
    while (true) {
      const skillName = data[`skill_name_${skillIndex}`];
      if (!skillName) break;

      const skillDetails = [];
      let detailIndex = 0;
      while (true) {
        const detail = data[`skill_${skillIndex}_detail_${detailIndex}`];
        if (!detail) break;
        skillDetails.push(detail);
        detailIndex += 1;
      }

      if (skillName && skillDetails.length > 0) {
        skills.push({ name: skillName, details: skillDetails.join(', ') });
      }
      skillIndex += 1;
    }

    const education = (data.education || []).map((edu) => ({
      institution: edu.institution || '',
      city: edu.city || '',
      degree: edu.degree || '',
      dates: edu.dates || '',
    }));

    const experience = (data.experience || []).map((exp) => ({
      title: exp.title || '',
      company: exp.company || '',
      location: exp.location || '',
      dates: exp.dates || '',
      responsibilities: (exp.responsibilities || []).map((resp) => resp || ''),
    }));

    const projects = (data.projects || []).map((proj) => ({
      title: proj.title || '',
      tech_stack: proj.tech_stack || '',
      dates: proj.dates || '',
      details: (proj.details || []).map((detail) => detail || ''),
    }));

    const renderedLatex = Mustache.render(latexTemplate, {
      ...data,
      skills: data.skills.map(skill => ({
        ...skill,
        details: skill.details.filter(detail => detail).join(', '),
      })),
      education: data.education || [],
      experience: data.experience.map(exp => ({
        ...exp,
        responsibilities: exp.responsibilities.filter(resp => resp),
      })) || [],
      projects: data.projects.map(proj => ({
        ...proj,
        details: proj.details.filter(detail => detail),
      })) || [],
    });
    

    console.log('Rendered LaTeX:', renderedLatex);

    await writeFile(texFilePath, renderedLatex);

    await new Promise((resolve, reject) => {
      const process = spawn('xelatex', ['-output-directory=public', texFilePath]);

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
        if (code !== 0) {
          console.error('XeLaTeX process output:', output);
          reject(new Error(`XeLaTeX process exited with code ${code}. Output: ${output}`));
          return;
        }
        resolve();
      });
    });

    if (fs.existsSync(pdfFilePath)) {
      console.log('PDF file exists:', pdfFilePath);
      return NextResponse.json({ pdfUrl: `/resume_output.pdf?${new Date().getTime()}` });  // Append timestamp to URL to force update
    } else {
      throw new Error('PDF was not generated. Check the LaTeX template and XeLaTeX output for errors.');
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    try {
      await unlink(texFilePath);
    } catch (error) {
      // File might not exist, ignore
    }
  }
}
