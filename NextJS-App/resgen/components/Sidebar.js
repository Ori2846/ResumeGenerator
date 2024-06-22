import { useState } from 'react';
import {
  UserIcon,
  BriefcaseIcon,
  BookOpenIcon,
  CogIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  Bars3Icon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ currentSection, setCurrentSection, isSidebarOpen, setIsSidebarOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`fixed inset-0 z-40 transform md:relative md:transform-none transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-gray-900 text-white ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="sidebar-header p-6 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-3xl font-extrabold">Engr Resumes</h2>}
        <button className="text-white" onClick={toggleSidebar}>
          {isCollapsed ? <Bars3Icon className="h-6 w-6" /> : <ChevronLeftIcon className="h-6 w-6" />}
        </button>
      </div>
      <nav className="sidebar-nav flex flex-col space-y-4 p-6">
        <button onClick={() => { setCurrentSection('personal-info'); setIsSidebarOpen(false); }} className={`${currentSection === 'personal-info' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <UserIcon className="icon" /> {!isCollapsed && <span className="text">Personal Information</span>}
        </button>
        <button onClick={() => { setCurrentSection('summary'); setIsSidebarOpen(false); }} className={`${currentSection === 'summary' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <BookOpenIcon className="icon" /> {!isCollapsed && <span className="text">Summary</span>}
        </button>
        <button onClick={() => { setCurrentSection('experience'); setIsSidebarOpen(false); }} className={`${currentSection === 'experience' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <BriefcaseIcon className="icon" /> {!isCollapsed && <span className="text">Experience</span>}
        </button>
        <button onClick={() => { setCurrentSection('education'); setIsSidebarOpen(false); }} className={`${currentSection === 'education' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <AcademicCapIcon className="icon" /> {!isCollapsed && <span className="text">Education</span>}
        </button>
        <button onClick={() => { setCurrentSection('skills'); setIsSidebarOpen(false); }} className={`${currentSection === 'skills' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <CogIcon className="icon" /> {!isCollapsed && <span className="text">Skills</span>}
        </button>
        <button onClick={() => { setCurrentSection('projects'); setIsSidebarOpen(false); }} className={`${currentSection === 'projects' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <DocumentTextIcon className="icon" /> {!isCollapsed && <span className="text">Projects</span>}
        </button>
        <button onClick={() => { setCurrentSection('template'); setIsSidebarOpen(false); }} className={`${currentSection === 'template' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}>
          <DocumentTextIcon className="icon" /> {!isCollapsed && <span className="text">Template</span>}
        </button>
        {!isCollapsed && (
          <>
            <a href="/terms-and-conditions" className="text-gray-500 text-sm hover:text-gray-300">Terms and Conditions</a>
            <a href="/privacy-policy" className="text-gray-500 text-sm hover:text-gray-300">Privacy Policy</a>
            <a href="/accessibility-policy" className="text-gray-500 text-sm hover:text-gray-300">Accessibility Policy</a>
          </>
        )}
      </nav>
    </aside>
  );
}
