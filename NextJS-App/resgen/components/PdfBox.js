//components/pdfbox.js
import { useState } from 'react';

export default function PdfBox({ pdfUrl, formData, latexSource }) {
  const [view, setView] = useState('pdf');

  const handleDownload = () => {
    if (view === 'pdf') {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (view === 'json') {
      const jsonBlob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(jsonBlob);
      link.download = 'resume.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (view === 'latex') {
      const latexBlob = new Blob([latexSource], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(latexBlob);
      link.download = 'resume.tex';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="pdf-box-container bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <div className="pdf-box-buttons flex justify-center space-x-2 p-4 bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => setView('pdf')}
          className={`btn ${view === 'pdf' ? 'btn-active' : ''}`}
        >
          PDF
        </button>
        <button
          onClick={() => setView('json')}
          className={`btn ${view === 'json' ? 'btn-active' : ''}`}
        >
          JSON
        </button>
        <button
          onClick={() => setView('latex')}
          className={`btn ${view === 'latex' ? 'btn-active' : ''}`}
        >
          LaTeX
        </button>
        <button onClick={handleDownload} className="btn">
          Download
        </button>
      </div>
      <div className="pdf-box-content flex-1 bg-gray-100 p-4 overflow-auto">
        {view === 'pdf' && (
          <iframe src={pdfUrl} type="application/pdf" className="w-full h-full rounded-lg"></iframe>
        )}
        {view === 'json' && (
          <pre className="json-content p-4 font-mono text-sm bg-white rounded-lg shadow-inner">{JSON.stringify(formData, null, 2)}</pre>
        )}
        {view === 'latex' && (
          <pre className="latex-content p-4 font-mono text-sm bg-white rounded-lg shadow-inner">{latexSource}</pre>
        )}
      </div>
    </div>
  );
}
