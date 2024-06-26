import React from 'react';

export default function Footer() {
  return (
    <footer className="footer bg-gray-800 text-gray-400 py-4 text-sm">
      <div className="footer-content container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="footer-left mb-2 md:mb-0">
          <span>© 2024 HD</span>
        </div>
        <div className="footer-right space-x-3 text-xs">
          <a href="/about" className="hover:underline">About</a>
          <a href="https://github.com/Ori2846/ResumeGenerator" target="_blank" rel="noopener noreferrer" className="hover:underline">Source</a>
          <a href="https://github.com/Ori2846/ResumeGenerator/issues" target="_blank" rel="noopener noreferrer" className="hover:underline">Issues</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/terms-and-conditions" className="hover:underline">Terms and Conditions</a>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="/accessibility-policy" className="hover:underline">Accessibility Policy</a>
          <a href="/copyright-notice" className="hover:underline">Copyright Notice</a>
          <a href="/cookie-policy" className="hover:underline">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
