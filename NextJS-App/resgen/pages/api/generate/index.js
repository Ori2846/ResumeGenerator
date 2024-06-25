import { Octokit } from "@octokit/rest";
import fs from 'fs';
import path from 'path';
import Mustache from 'mustache';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = 'hdo2846';
const repo = 'ResumeGenerator';
const filePath = 'NextJS-App/resgen/uploads/resume_output.tex';
const branch = 'v2';

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
      const base64Content = Buffer.from(texFileContent).toString('base64');

      let sha;
      try {
        const { data: fileData } = await octokit.repos.getContent({
          owner,
          repo,
          path: filePath,
          ref: branch,
        });
        sha = fileData.sha;
      } catch (error) {
        if (error.status !== 404) {
          throw error;
        }
      }

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message: 'Add LaTeX file for PDF generation',
        content: base64Content,
        committer: {
          name: 'Henry',
          email: 'hdo2846@gmail.com'
        },
        author: {
          name: 'Henry',
          email: 'hdo2846@gmail.com'
        },
        branch,
        sha,
      });

      await octokit.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id: 'xelatex.yml',
        ref: branch
      });

      // Polling for the artifact URL
      const pollInterval = 10000; // 10 seconds
      const maxRetries = 30; // 5 minutes

      const getArtifactUrl = async (retries = 0) => {
        if (retries >= maxRetries) {
          throw new Error('PDF generation timed out');
        }

        try {
          const { data: workflowRuns } = await octokit.actions.listWorkflowRunsForRepo({
            owner,
            repo,
            branch,
            status: 'completed'
          });

          if (workflowRuns.workflow_runs.length === 0) {
            await new Promise(resolve => setTimeout(resolve, pollInterval));
            return await getArtifactUrl(retries + 1);
          }

          const latestRun = workflowRuns.workflow_runs[0];
          const { data: artifacts } = await octokit.actions.listWorkflowRunArtifacts({
            owner,
            repo,
            run_id: latestRun.id
          });

          const artifact = artifacts.artifacts.find(a => a.name === 'compiled-pdf');
          if (artifact) {
            const { data: artifactData } = await octokit.actions.downloadArtifact({
              owner,
              repo,
              artifact_id: artifact.id,
              archive_format: 'zip'
            });

            const artifactUrl = artifactData.url;
            return artifactUrl;
          }

          await new Promise(resolve => setTimeout(resolve, pollInterval));
          return await getArtifactUrl(retries + 1);
        } catch (error) {
          console.error('Error fetching artifacts:', error);
          await new Promise(resolve => setTimeout(resolve, pollInterval));
          return await getArtifactUrl(retries + 1);
        }
      };

      const pdfUrl = await getArtifactUrl();

      res.status(200).json({ pdfUrl });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
