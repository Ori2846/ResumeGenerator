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
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialSections = [
  { id: 'template', icon: DocumentTextIcon, label: 'Template' },
  { id: 'personal-info', icon: UserIcon, label: 'Personal Info' },
  { id: 'summary', icon: BookOpenIcon, label: 'Summary' },
  { id: 'education', icon: AcademicCapIcon, label: 'Education' },
  { id: 'experience', icon: BriefcaseIcon, label: 'Experience' },
  { id: 'projects', icon: DocumentTextIcon, label: 'Projects' },
  { id: 'skills', icon: CogIcon, label: 'Skills' },
];

export default function Sidebar({ currentSection, setCurrentSection, isSidebarOpen, setIsSidebarOpen, setFormData, initialFormData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [orderedSections, setOrderedSections] = useState(initialSections);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = Array.from(orderedSections);
    const [movedSection] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, movedSection);

    setOrderedSections(newSections);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        setFormData(json);
      };
      reader.readAsText(file);
    }
  };

  const clearData = () => {
    localStorage.removeItem('savedFormData');
    setFormData(initialFormData);
    window.location.reload(); // Refresh the page
  };

  return (
    <aside className={`fixed inset-0 z-40 transform md:relative md:transform-none transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-gray-900 text-white ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="sidebar-header p-6 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-3xl font-extrabold">Engr Resumes</h2>}
        <button className="text-white" onClick={toggleSidebar}>
          {isCollapsed ? <Bars3Icon className="h-6 w-8" /> : <ChevronLeftIcon className="h-6 w-6" />}
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sidebar-sections">
          {(provided) => (
            <nav className="sidebar-nav flex-1 flex flex-col space-y-4 p-3" ref={provided.innerRef} {...provided.droppableProps}>
              {orderedSections.map((section, index) => (
                section.id === 'template' ? (
                  <div
                    key={section.id}
                    className="draggable-item flex-grow flex"
                  >
                    <button
                      onClick={() => { setCurrentSection(section.id); setIsSidebarOpen(false); }}
                      className={`${currentSection === section.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center w-full text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}
                    >
                      <section.icon className="icon" />
                      {!isCollapsed && <span className="ml-3 flex-grow">{section.label}</span>}
                    </button>
                  </div>
                ) : (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="draggable-item flex-grow flex"
                      >
                        <button
                          onClick={() => { setCurrentSection(section.id); setIsSidebarOpen(false); }}
                          className={`${currentSection === section.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} flex items-center w-full text-white py-2 px-4 rounded-lg ${isCollapsed ? 'justify-center' : ''}`}
                        >
                          <section.icon className="icon" />
                          {!isCollapsed && <span className="ml-3 flex-grow">{section.label}</span>}
                          <Bars3Icon className="h-5 w-5 text-gray-400 ml-auto" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                )
              ))}
              {provided.placeholder}
            </nav>
          )}
        </Droppable>
      </DragDropContext>
      {!isCollapsed && (
        <div className="flex flex-col p-3 space-y-2">
          <hr className="border-gray-700 my-4" />
          <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-center">
            <label className="cursor-pointer flex items-center justify-center">
              Import JSON
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </button>
          <button
            onClick={clearData}
            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-center"
          >
            Clear Data
          </button>
        </div>
      )}
    </aside>
  );
}
