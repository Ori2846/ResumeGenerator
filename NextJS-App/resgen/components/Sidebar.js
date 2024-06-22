import { useState } from 'react';

export default function Sidebar({ currentSection, setCurrentSection, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <aside className={`fixed inset-0 z-40 transform md:relative md:transform-none transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 sidebar`}>
      <div className="sidebar-header p-6">
        <h2 className="text-3xl font-extrabold">Engr Resumes</h2>
      </div>
      <nav className="sidebar-nav flex flex-col space-y-4 p-6">
        <button onClick={() => { setCurrentSection('personal-info'); setIsSidebarOpen(false); }} className={`${currentSection === 'personal-info' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg`}>
          Personal Information
        </button>
        <button onClick={() => { setCurrentSection('summary'); setIsSidebarOpen(false); }} className={`${currentSection === 'summary' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg`}>
          Summary
        </button>
        <button onClick={() => { setCurrentSection('experience'); setIsSidebarOpen(false); }} className={`${currentSection === 'experience' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg`}>
          Experience
        </button>
        <button onClick={() => { setCurrentSection('education'); setIsSidebarOpen(false); }} className={`${currentSection === 'education' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg`}>
          Education
        </button>
        <button onClick={() => { setCurrentSection('skills'); setIsSidebarOpen(false); }} className={`${currentSection === 'skills' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg`}>
          Skills
        </button>
        <button onClick={() => { setCurrentSection('projects'); setIsSidebarOpen(false); }} className={`${currentSection === 'projects' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg`}>
          Projects
        </button>
        <button onClick={() => { setCurrentSection('template'); setIsSidebarOpen(false); }} className={`${currentSection === 'template' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg`}>
          Template
        </button>
        <a href="/terms-and-conditions" className="text-gray-500 text-sm hover:text-gray-300">Terms and Conditions</a>
        <a href="/privacy-policy" className="text-gray-500 text-sm hover:text-gray-300">Privacy Policy</a>
        <a href="/accessibility-policy" className="text-gray-500 text-sm hover:text-gray-300">Accessibility Policy</a>
      </nav>
    </aside>
  );
}
