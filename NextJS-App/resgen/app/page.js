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
    personalInfo: [
      { label: 'Email', value: '', link: '', placeholder: 'john.doe@example.com', removable: false, isLink: false },
      { label: 'Phone', value: '', link: '', placeholder: '+1(234)567-8901', removable: false, isLink: false },
      { label: 'GitHub', value: '', link: '', placeholder: 'Github Username', removable: false, isLink: false },
      { label: 'LinkedIn', value: '', link: '', placeholder: 'Linkedin Username', removable: false, isLink: false }
    ],
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

  const handleChange = (e, index = null, section = null) => {
    if (section === 'personalInfo') {
      const newPersonalInfo = [...formData.personalInfo];
      newPersonalInfo[index].value = e.target.value;
      setFormData({ ...formData, personalInfo: newPersonalInfo });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleLinkChange = (e, index) => {
    const newPersonalInfo = [...formData.personalInfo];
    let linkValue = e.target.value.trim();
    if (!linkValue.startsWith('http://') && !linkValue.startsWith('https://')) {
      linkValue = `https://${linkValue}`;
    }
    newPersonalInfo[index].link = decodeURIComponent(linkValue);
    setFormData({ ...formData, personalInfo: newPersonalInfo });
  };
  
  

  const handleAddField = () => {
    setFormData({
      ...formData,
      personalInfo: [...formData.personalInfo, { label: '', value: '', link: '', placeholder: 'Enter value', removable: true, isLink: false }]
    });
  };

  const handleRemoveField = (index) => {
    const newPersonalInfo = [...formData.personalInfo];
    newPersonalInfo.splice(index, 1);
    setFormData({ ...formData, personalInfo: newPersonalInfo });
  };

  const handleFieldLabelChange = (e, index) => {
    const newPersonalInfo = [...formData.personalInfo];
    newPersonalInfo[index].label = e.target.value;
    setFormData({ ...formData, personalInfo: newPersonalInfo });
  };

  const handleLinkToggle = (index) => {
    const newPersonalInfo = [...formData.personalInfo];
    newPersonalInfo[index].isLink = !newPersonalInfo[index].isLink;
    setFormData({ ...formData, personalInfo: newPersonalInfo });
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
    <div className="app-container">
      <button
        className="md:hidden bg-gray-900 text-white p-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        Menu
      </button>
      <aside
        className={`fixed inset-0 z-40 transform md:relative md:transform-none transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 sidebar`}
      >
        <div className="sidebar-header">
          <h2 className="text-3xl font-extrabold">Resume Generator</h2>
        </div>
        <nav className="sidebar-nav flex flex-col space-y-4">
          <button onClick={() => { setCurrentSection('personal-info'); setIsSidebarOpen(false); }} className={`${currentSection === 'personal-info' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Personal Information
          </button>
          <button onClick={() => { setCurrentSection('summary'); setIsSidebarOpen(false); }} className={`${currentSection === 'summary' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Summary
          </button>
          <button onClick={() => { setCurrentSection('experience'); setIsSidebarOpen(false); }} className={`${currentSection === 'experience' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Experience
          </button>
          <button onClick={() => { setCurrentSection('education'); setIsSidebarOpen(false); }} className={`${currentSection === 'education' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Education
          </button>
          <button onClick={() => { setCurrentSection('skills'); setIsSidebarOpen(false); }} className={`${currentSection === 'skills' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Skills
          </button>
          <button onClick={() => { setCurrentSection('projects'); setIsSidebarOpen(false); }} className={`${currentSection === 'projects' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Projects
          </button>
          <button onClick={() => { setCurrentSection('template'); setIsSidebarOpen(false); }} className={`${currentSection === 'template' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}>
            Template
          </button>
        </nav>
      </aside>
      <main className="main-content">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-header">
            <h1>{currentSection.replace('-', ' ').toUpperCase()}</h1>
          </div>
          <div className="form-body">
            {currentSection === 'personal-info' && (
              <div className="col-span-1">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name || ''} placeholder="John Doe" />
                </div>
                {formData.personalInfo.map((info, index) => (
                  <div key={index} className="form-group">
                    <input
                      type="text"
                      className="form-label-input"
                      onChange={(e) => handleFieldLabelChange(e, index)}
                      value={info.label}
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleChange(e, index, 'personalInfo')}
                      value={info.value}
                      placeholder={info.placeholder}
                    />
                    {info.isLink && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        onChange={(e) => handleLinkChange(e, index)}
                        value={info.link}
                        placeholder="Enter URL"
                      />
                    )}
                    {info.removable && (
                      <button type="button" className="btn-remove" onClick={() => handleRemoveField(index)}>
                        ✕
                      </button>
                    )}
                    <label className="form-label inline-flex items-center mt-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        onChange={() => handleLinkToggle(index)}
                        checked={info.isLink}
                      />
                      <span className="ml-2">Is Link</span>
                    </label>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddField}>
                  Add Field
                </button>
              </div>
            )}

            {currentSection === 'summary' && (
              <div className="col-span-1">
                <div className="form-group">
                  <label htmlFor="summary" className="form-label">Summary:</label>
                  <textarea className="form-control" id="summary" name="summary" onChange={handleChange} value={formData.summary || ''} placeholder="Professional summary..."></textarea>
                </div>
              </div>
            )}

            {currentSection === 'experience' && (
              <div className="col-span-1">
                {formData.experience.length > 0 && (
                  <h2 className="text-xl font-bold mb-4">Experiences</h2>
                )}
                {formData.experience.map((exp, index) => (
                  <div key={index} className="form-group">
                    <div className="form-group">
                      <label htmlFor={`experience_title_${index}`} className="form-label">Title:</label>
                      <input type="text" className="form-control" id={`experience_title_${index}`} name={`experience_title_${index}`} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} value={exp.title} placeholder="Job Title" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`experience_company_${index}`} className="form-label">Company:</label>
                      <input type="text" className="form-control" id={`experience_company_${index}`} name={`experience_company_${index}`} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} value={exp.company} placeholder="Company Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`experience_location_${index}`} className="form-label">Location:</label>
                      <input type="text" className="form-control" id={`experience_location_${index}`} name={`experience_location_${index}`} onChange={(e) => handleExperienceChange(index, 'location', e.target.value)} value={exp.location} placeholder="Location" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`experience_dates_${index}`} className="form-label">Dates:</label>
                      <input type="text" className="form-control" id={`experience_dates_${index}`} name={`experience_dates_${index}`} onChange={(e) => handleExperienceChange(index, 'dates', e.target.value)} value={exp.dates} placeholder="MM/YYYY - MM/YYYY" />
                    </div>
                    {exp.responsibilities.map((res, resIndex) => (
                      <div key={resIndex} className="form-group">
                        <label htmlFor={`experience_responsibilities_${index}_${resIndex}`} className="form-label">Responsibility:</label>
                        <input type="text" className="form-control" id={`experience_responsibilities_${index}_${resIndex}`} name={`experience_responsibilities_${index}_${resIndex}`} onChange={(e) => handleExperienceResponsibilityChange(index, resIndex, e.target.value)} value={res} placeholder="Responsibility" />
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => handleExperienceResponsibilityChange(index, exp.responsibilities.length, '')}>
                      Add Responsibility
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={handleAddExperience}>
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
                  <div key={index} className="form-group">
                    <div className="form-group">
                      <label htmlFor={`education_institution_${index}`} className="form-label">Institution:</label>
                      <input type="text" className="form-control" id={`education_institution_${index}`} name={`education_institution_${index}`} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} value={edu.institution} placeholder="Institution Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`education_city_${index}`} className="form-label">City:</label>
                      <input type="text" className="form-control" id={`education_city_${index}`} name={`education_city_${index}`} onChange={(e) => handleEducationChange(index, 'city', e.target.value)} value={edu.city} placeholder="City" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`education_degree_${index}`} className="form-label">Degree:</label>
                      <input type="text" className="form-control" id={`education_degree_${index}`} name={`education_degree_${index}`} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} value={edu.degree} placeholder="Degree" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`education_dates_${index}`} className="form-label">Dates:</label>
                      <input type="text" className="form-control" id={`education_dates_${index}`} name={`education_dates_${index}`} onChange={(e) => handleEducationChange(index, 'dates', e.target.value)} value={edu.dates} placeholder="MM/YYYY - MM/YYYY" />
                    </div>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={handleAddEducation}>
                  Add Education
                </button>
              </div>
            )}

            {currentSection === 'skills' && (
              <div className="col-span-1">
                <div className="form-group">
                  <label htmlFor="skills_header" className="form-label">Skills Header:</label>
                  <input type="text" className="form-control" id="skills_header" name="skills_header" onChange={handleChange} value={formData.skills_header || 'Skills'} placeholder="Skills Header" />
                </div>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="form-group">
                    <div className="form-group">
                      <label htmlFor={`skill_name_${index}`} className="form-label">Skill Name:</label>
                      <input type="text" className="form-control" id={`skill_name_${index}`} name={`skill_name_${index}`} onChange={(e) => handleSkillChange(index, 'name', e.target.value)} value={skill.name} placeholder="Skill Name" />
                    </div>
                    {skill.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="form-group flex items-center">
                        <input type="text" className="form-control" id={`skill_${index}_detail_${detailIndex}`} name={`skill_${index}_detail_${detailIndex}`} onChange={(e) => handleSkillDetailChange(index, detailIndex, e.target.value)} value={detail} placeholder="Detail" />
                        <button type="button" className="btn btn-danger" onClick={() => handleRemoveSkillDetail(index, detailIndex)}>
                          -
                        </button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => handleSkillDetailChange(index, skill.details.length, '')}>
                      +
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveSkill(index)}>
                      Remove Skill
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={handleAddSkill}>
                  Add Skill
                </button>
              </div>
            )}

            {currentSection === 'projects' && (
              <div className="col-span-1">
                {formData.projects.map((proj, index) => (
                  <div key={index} className="form-group">
                    <div className="form-group">
                      <label htmlFor={`project_title_${index}`} className="form-label">Title:</label>
                      <input type="text" className="form-control" id={`project_title_${index}`} name={`project_title_${index}`} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} value={proj.title} placeholder="Project Title" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`project_tech_stack_${index}`} className="form-label">Tech Stack:</label>
                      <input type="text" className="form-control" id={`project_tech_stack_${index}`} name={`project_tech_stack_${index}`} onChange={(e) => handleProjectChange(index, 'tech_stack', e.target.value)} value={proj.tech_stack} placeholder="Tech Stack" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`project_dates_${index}`} className="form-label">Dates:</label>
                      <input type="text" className="form-control" id={`project_dates_${index}`} name={`project_dates_${index}`} onChange={(e) => handleProjectChange(index, 'dates', e.target.value)} value={proj.dates} placeholder="MM/YYYY - MM/YYYY" />
                    </div>
                    {proj.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="form-group flex items-center">
                        <label htmlFor={`project_details_${index}_${detailIndex}`} className="form-label">Detail:</label>
                        <input type="text" className="form-control" id={`project_details_${index}_${detailIndex}`} name={`project_details_${index}_${detailIndex}`} onChange={(e) => handleProjectDetailChange(index, detailIndex, e.target.value)} value={detail} placeholder="Detail" />
                        <button type="button" className="btn btn-danger" onClick={() => handleRemoveProjectDetail(index, detailIndex)}>
                          -
                        </button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => handleProjectDetailChange(index, proj.details.length, '')}>
                      Add Detail
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-success" onClick={handleAddProject}>
                  Add Project
                </button>
              </div>
            )}

            {currentSection === 'template' && (
              <div className="col-span-1">
                <div className="form-group">
                  <label htmlFor="template" className="form-label">Choose Template:</label>
                  <select className="form-control" id="template" name="template" onChange={handleChange} value={formData.template || 'template1'}>
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Generate Resume
          </button>
        </form>
      </main>
      <section className="pdf-container">
        <div className="pdf-iframe-container">
          {pdfUrl ? (
            <iframe src={pdfUrl} type="application/pdf" className="pdf-iframe"></iframe>
          ) : (
            <div className="placeholder">PDF will appear here</div>
          )}
        </div>
      </section>
    </div>
  );
}
