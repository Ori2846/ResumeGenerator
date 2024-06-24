import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import 'pdfjs-dist/web/pdf_viewer.css';
import yaml from 'js-yaml';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function PdfBox({ pdfUrl, formData, latexSource }) {
  const [view, setView] = useState('pdf');
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    if (view === 'pdf' && pdfUrl) {
      fetchAndRenderPdf();
    }
  }, [view, pdfUrl]);

  const fetchAndRenderPdf = async () => {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const pdfContainer = pdfContainerRef.current;
    pdfContainer.innerHTML = ''; // Clear previous content

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const scale = 1.22; // Adjust the scale to fit the size of the container
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      const pageDiv = document.createElement('div');
      pageDiv.className = 'pdf-page';
      pageDiv.appendChild(canvas);
      pdfContainer.appendChild(pageDiv);
    }
  };

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
      const zip = new JSZip();
      zip.file('resume.tex', latexSource);
      zip.file('README.txt', "This is the LaTeX source file for the resume. To view this file, import it to overleaf.com and set the compiler to XeLaTeX.");
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'resume.zip');
      });
    } else if (view === 'yaml') {
      const yamlBlob = new Blob([yaml.dump(formData)], { type: 'text/yaml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(yamlBlob);
      link.download = 'resume.yaml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="pdf-box-container bg-white shadow-md rounded-lg overflow-hidden flex flex-col relative">
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
        <button
          onClick={() => setView('yaml')}
          className={`btn ${view === 'yaml' ? 'btn-active' : ''}`}
        >
          YAML
        </button>
        <button onClick={handleDownload} className="btn btn-download">
          Download
        </button>
      </div>
      <div className="pdf-box-content flex-1 bg-gray-100 p-4 overflow-auto relative">
        {view === 'pdf' && (
          <div ref={pdfContainerRef} className="w-full h-auto rounded-lg"></div>
        )}
        {view === 'json' && (
          <pre className="json-content p-4 font-mono text-sm bg-white rounded-lg shadow-inner">
            {JSON.stringify(formData, null, 2)}
          </pre>
        )}
        {view === 'latex' && (
          <pre className="latex-content p-4 font-mono text-sm bg-white rounded-lg shadow-inner">
            {latexSource}
          </pre>
        )}
        {view === 'yaml' && (
          <pre className="yaml-content p-4 font-mono text-sm bg-white rounded-lg shadow-inner">
            {yaml.dump(formData)}
          </pre>
        )}
      </div>
    </div>
  );
}
