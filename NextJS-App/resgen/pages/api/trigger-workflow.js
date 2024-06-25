// pages/api/trigger-workflow.js

import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      return res.status(500).json({ error: 'GitHub token is missing' });
    }

    try {
      const response = await fetch('https://api.github.com/repos/ori2846/ResumeGenerator/actions/workflows/latex_to_pdf.yml/dispatches', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
        },
        body: JSON.stringify({
          ref: 'main',
        }),
      });

      if (response.ok) {
        res.status(200).send('Workflow triggered successfully!');
      } else {
        const errorText = await response.text();
        res.status(response.status).send(errorText);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

 