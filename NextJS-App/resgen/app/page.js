"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

export default function Home() {
  const [formData, setFormData] = useState({
    template: 'template1',
    education: [],
    experience: [],
    projects: [],
    skills: [],
    name: '',
    email: '',
    phone: '',
    github: '',
    linkedin: ''
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentSection, setCurrentSection] = useState('personal-info');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('formData');
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: '', city: '', degree: '', dates: '' }],
    });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { title: '', company: '', location: '', dates: '', responsibilities: [''] },
      ],
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    setFormData({ ...formData, experience: newExperience });
  };

  const handleExperienceResponsibilityChange = (expIndex, resIndex, value) => {
    const newExperience = [...formData.experience];
    newExperience[expIndex].responsibilities[resIndex] = value;
    setFormData({ ...formData, experience: newExperience });
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', tech_stack: '', dates: '', details: [''] }],
    });
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const handleProjectDetailChange = (projIndex, detIndex, value) => {
    const newProjects = [...formData.projects];
    newProjects[projIndex].details[detIndex] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: '', details: [''] }],
    });
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSkillDetailChange = (skillIndex, detailIndex, value) => {
    const newSkills = [...formData.skills];
    newSkills[skillIndex].details[detailIndex] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const handleRemoveSkillDetail = (skillIndex, detailIndex) => {
    const newSkills = [...formData.skills];
    newSkills[skillIndex].details.splice(detailIndex, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleRemoveProjectDetail = (projIndex, detailIndex) => {
    const newProjects = [...formData.projects];
    newProjects[projIndex].details.splice(detailIndex, 1);
    setFormData({ ...formData, projects: newProjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData);
      const response = await axios.post('/api/generate', formData);
      console.log('Server Response:', response.data);
      setPdfUrl(response.data.pdfUrl);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    console.log('Current formData:', formData);
  }, [formData]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <button
        className="md:hidden bg-gray-900 text-white p-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        Menu
      </button>
      <aside
        className={`fixed inset-0 z-40 transform md:relative md:transform-none transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-1/4 bg-gray-900 text-white p-4 md:p-6 flex flex-col shadow-lg max-h-screen overflow-y-auto`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">Resume Generator</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <button onClick={() => { setCurrentSection('personal-info'); setIsSidebarOpen(false); }} className={`py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 ${currentSection === 'personal-info' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Personal Information
          </button>
          <button onClick={() => { setCurrentSection('summary'); setIsSidebarOpen(false); }} className={`py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 ${currentSection === 'summary' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Summary
          </button>
          <button onClick={() => { setCurrentSection('experience'); setIsSidebarOpen(false); }} className={`py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 ${currentSection === 'experience' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Experience
          </button>
          <button onClick={() => { setCurrentSection('education'); setIsSidebarOpen(false); }} className={`py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 ${currentSection === 'education' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Education
          </button>
          <button onClick={() => { setCurrentSection('skills'); setIsSidebarOpen(false); }} className={`py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 ${currentSection === 'skills' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Skills
          </button>
          <button onClick={() => { setCurrentSection('projects'); setIsSidebarOpen(false); }} className={`py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 ${currentSection === 'projects' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Projects
          </button>
          <button onClick={() => { setCurrentSection('template'); setIsSidebarOpen(false); }} className={`py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 ${currentSection === 'template' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Template
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto mt-16 md:mt-0">
        <form onSubmit={handleSubmit} className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{currentSection.replace('-', ' ').toUpperCase()}</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
          {currentSection === 'personal-info' && (
              <div className="col-span-1">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-semibold">Name:</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="name" name="name" onChange={handleChange} value={formData.name || ''} placeholder="John Doe" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                  <input type="email" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="email" name="email" onChange={handleChange} value={formData.email || ''} placeholder="john.doe@example.com" />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-semibold">Phone:</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="phone" name="phone" onChange={handleChange} value={formData.phone || ''} placeholder="+1(234)567-8901" />
                </div>
                <div className="mb-4">
                  <label htmlFor="github" className="block text-gray-700 font-semibold">GitHub:</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="github" name="github" onChange={handleChange} value={formData.github || ''} placeholder="Github Username" />
                </div>
                <div className="mb-4">
                  <label htmlFor="linkedin" className="block text-gray-700 font-semibold">LinkedIn:</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="linkedin" name="linkedin" onChange={handleChange} value={formData.linkedin || ''} placeholder="Linkedin Username" />
                </div>
              </div>
            )}

            {currentSection === 'summary' && (
              <div className="col-span-1">
                <div className="mb-4">
                  <label htmlFor="summary" className="block text-gray-700 font-semibold">Summary:</label>
                  <textarea className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="summary" name="summary" onChange={handleChange} value={formData.summary || ''} placeholder="Professional summary..."></textarea>
                </div>
              </div>
            )}

            {currentSection === 'experience' && (
              <div className="col-span-1">
                {formData.experience.length > 0 && (
                  <h2 className="text-xl font-bold mb-4">Experiences</h2>
                )}
                {formData.experience.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <div className="mb-4">
                      <label htmlFor={`experience_title_${index}`} className="block text-gray-700 font-semibold">Title:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`experience_title_${index}`} name={`experience_title_${index}`} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} value={exp.title} placeholder="Job Title" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`experience_company_${index}`} className="block text-gray-700 font-semibold">Company:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`experience_company_${index}`} name={`experience_company_${index}`} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} value={exp.company} placeholder="Company Name" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`experience_location_${index}`} className="block text-gray-700 font-semibold">Location:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`experience_location_${index}`} name={`experience_location_${index}`} onChange={(e) => handleExperienceChange(index, 'location', e.target.value)} value={exp.location} placeholder="Location" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`experience_dates_${index}`} className="block text-gray-700 font-semibold">Dates:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`experience_dates_${index}`} name={`experience_dates_${index}`} onChange={(e) => handleExperienceChange(index, 'dates', e.target.value)} value={exp.dates} placeholder="MM/YYYY - MM/YYYY" />
                    </div>
                    {exp.responsibilities.map((res, resIndex) => (
                      <div key={resIndex} className="mb-4 flex items-center">
                        <label htmlFor={`experience_responsibilities_${index}_${resIndex}`} className="block text-gray-700 font-semibold">Responsibility:</label>
                        <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`experience_responsibilities_${index}_${resIndex}`} name={`experience_responsibilities_${index}_${resIndex}`} onChange={(e) => handleExperienceResponsibilityChange(index, resIndex, e.target.value)} value={res} placeholder="Responsibility" />
                      </div>
                    ))}
                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300" onClick={() => handleExperienceResponsibilityChange(index, exp.responsibilities.length, '')}>
                      Add Responsibility
                    </button>
                  </div>
                ))}
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors duration-300" onClick={handleAddExperience}>
                  Add Experience
                </button>
              </div>
            )}

            {currentSection === 'education' && (
              <div className="col-span-1">
                {formData.education.length > 0 && (
                  <h2 className="text-xl font-bold mb-4">Education</h2>
                )}
                {formData.education.map((edu, index) => (
                  <div key={index} className="mb-6">
                    <div className="mb-4">
                      <label htmlFor={`education_institution_${index}`} className="block text-gray-700 font-semibold">Institution:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`education_institution_${index}`} name={`education_institution_${index}`} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} value={edu.institution} placeholder="Institution Name" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`education_city_${index}`} className="block text-gray-700 font-semibold">City:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`education_city_${index}`} name={`education_city_${index}`} onChange={(e) => handleEducationChange(index, 'city', e.target.value)} value={edu.city} placeholder="City" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`education_degree_${index}`} className="block text-gray-700 font-semibold">Degree:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`education_degree_${index}`} name={`education_degree_${index}`} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} value={edu.degree} placeholder="Degree" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`education_dates_${index}`} className="block text-gray-700 font-semibold">Dates:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`education_dates_${index}`} name={`education_dates_${index}`} onChange={(e) => handleEducationChange(index, 'dates', e.target.value)} value={edu.dates} placeholder="MM/YYYY - MM/YYYY" />
                    </div>
                  </div>
                ))}
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors duration-300" onClick={handleAddEducation}>
                  Add Education
                </button>
              </div>
            )}

            {currentSection === 'skills' && (
              <div className="col-span-1">
                <div className="mb-4">
                  <label htmlFor="skills_header" className="block text-gray-700 font-semibold">Skills Header:</label>
                  <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="skills_header" name="skills_header" onChange={handleChange} value={formData.skills_header || 'Skills'} placeholder="Skills Header" />
                </div>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="mb-6">
                    <div className="mb-4">
                      <label htmlFor={`skill_name_${index}`} className="block text-gray-700 font-semibold">Skill Name:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`skill_name_${index}`} name={`skill_name_${index}`} onChange={(e) => handleSkillChange(index, 'name', e.target.value)} value={skill.name} placeholder="Skill Name" />
                    </div>
                    {skill.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="mb-4 flex items-center">
                        <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`skill_${index}_detail_${detailIndex}`} name={`skill_${index}_detail_${detailIndex}`} onChange={(e) => handleSkillDetailChange(index, detailIndex, e.target.value)} value={detail} placeholder="Detail" />
                        <button type="button" className="bg-red-500 text-white ml-2 px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-300" onClick={() => handleRemoveSkillDetail(index, detailIndex)}>
                          -
                        </button>
                      </div>
                    ))}
                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300" onClick={() => handleSkillDetailChange(index, skill.details.length, '')}>
                      +
                    </button>
                    <button type="button" className="bg-red-500 text-white ml-2 px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-300" onClick={() => handleRemoveSkill(index)}>
                      Remove Skill
                    </button>
                  </div>
                ))}
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors duration-300" onClick={handleAddSkill}>
                  Add Skill
                </button>
              </div>
            )}

            {currentSection === 'projects' && (
              <div className="col-span-1">
                {formData.projects.map((proj, index) => (
                  <div key={index} className="mb-6">
                    <div className="mb-4">
                      <label htmlFor={`project_title_${index}`} className="block text-gray-700 font-semibold">Title:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`project_title_${index}`} name={`project_title_${index}`} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} value={proj.title} placeholder="Project Title" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`project_tech_stack_${index}`} className="block text-gray-700 font-semibold">Tech Stack:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`project_tech_stack_${index}`} name={`project_tech_stack_${index}`} onChange={(e) => handleProjectChange(index, 'tech_stack', e.target.value)} value={proj.tech_stack} placeholder="Tech Stack" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor={`project_dates_${index}`} className="block text-gray-700 font-semibold">Dates:</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`project_dates_${index}`} name={`project_dates_${index}`} onChange={(e) => handleProjectChange(index, 'dates', e.target.value)} value={proj.dates} placeholder="MM/YYYY - MM/YYYY" />
                    </div>
                    {proj.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="mb-4 flex items-center">
                        <label htmlFor={`project_details_${index}_${detailIndex}`} className="block text-gray-700 font-semibold">Detail:</label>
                        <input type="text" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id={`project_details_${index}_${detailIndex}`} name={`project_details_${index}_${detailIndex}`} onChange={(e) => handleProjectDetailChange(index, detailIndex, e.target.value)} value={detail} placeholder="Detail" />
                        <button type="button" className="bg-red-500 text-white ml-2 px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-300" onClick={() => handleRemoveProjectDetail(index, detailIndex)}>
                          -
                        </button>
                      </div>
                    ))}
                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300" onClick={() => handleProjectDetailChange(index, proj.details.length, '')}>
                      Add Detail
                    </button>
                  </div>
                ))}
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors duration-300" onClick={handleAddProject}>
                  Add Project
                </button>
              </div>
            )}

            {currentSection === 'template' && (
              <div className="col-span-1">
                <div className="mb-4">
                  <label htmlFor="template" className="block text-gray-700 font-semibold">Choose Template:</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="template" name="template" onChange={handleChange} value={formData.template || 'template1'}>
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-lg mt-6 shadow hover:bg-green-600 transition-colors duration-300">
            Generate Resume
          </button>
        </form>
      </main>
      <section className="w-full md:w-1/2 p-4 md:p-8 bg-gray-100 flex justify-center items-center">
        <div className="w-full h-full bg-gray-300 rounded-lg flex justify-center items-center shadow-inner">
          {pdfUrl ? (
            <iframe src={pdfUrl} type="application/pdf" className="w-full h-full rounded-lg"></iframe>
          ) : (
            <div className="text-gray-700 text-lg">PDF will appear here</div>
          )}
        </div>
      </section>
    </div>
  );
}
