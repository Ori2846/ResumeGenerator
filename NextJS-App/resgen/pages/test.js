// pages/test.js

import React, { useState } from 'react';

const TestPage = () => {
  const [status, setStatus] = useState('');

  const triggerWorkflow = async () => {
    setStatus('Triggering workflow...');

    try {
      const response = await fetch('/api/trigger-workflow', {
        method: 'POST',
      });

      if (response.ok) {
        setStatus('Workflow triggered successfully!');
      } else {
        const errorText = await response.text();
        setStatus(`Failed to trigger workflow: ${errorText}`);
      }
    } catch (error) {
      setStatus(`Failed to trigger workflow: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={triggerWorkflow}>Trigger Workflow</button>
      <p>{status}</p>
    </div>
  );
};

export default TestPage;
