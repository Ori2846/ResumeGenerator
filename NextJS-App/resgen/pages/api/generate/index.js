import { Octokit } from "@octokit/rest";
import fs from 'fs';
import path from 'path';
import Mustache from 'mustache';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

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

    try {
      const latexTemplate = fs.readFileSync(latexTemplatePath, 'utf8');

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

      const tempDir = os.tmpdir();
      const texFilePath = path.join(tempDir, 'resume_output.tex');
      fs.writeFileSync(texFilePath, renderedLatex);

      const texFileContent = fs.readFileSync(texFilePath, 'utf8');

      await octokit.repos.createOrUpdateFileContents({
        owner: 'Ori2846',
        repo: 'ResumeGenerator',
        path: `NextJS-App/resgen/uploads/resume_output.tex`,
        message: 'Add LaTeX file for PDF generation',
        content: Buffer.from(texFileContent).toString('base64'),
        committer: {
          name: 'Henry',
          email: 'hdo2846@gmail.com'
        },
        author: {
          name: 'Henry',
          email: 'hdo2846@gmail.com'
        }
      });

      await octokit.actions.createWorkflowDispatch({
        owner: 'Ori2846',
        repo: 'ResumeGenerator',
        workflow_id: 'xelatex.yml',
        ref: 'main'
      });

      res.status(200).json({ message: 'Workflow triggered successfully' });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
