import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span>© 2024 Henry Do</span>
        </div>
        <div className="footer-right">
          <a href="/about">About</a>
          <a href="https://github.com/Ori2846/ResumeGenerator" target="_blank" rel="noopener noreferrer">Source</a>
          <a href="https://github.com/Ori2846/ResumeGenerator/issues" target="_blank" rel="noopener noreferrer">Issues</a>
          <a href="/contact">Contact</a>
          <a href="/terms-and-conditions">Terms and Conditions</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/accessibility-policy">Accessibility Policy</a>
          <a href="/copyright-notice">Copyright Notice</a> 
        </div>
      </div>
    </footer>
  );
}
