"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Assuming you have a styles.css file for custom styles

export default function Home() {
  const [formData, setFormData] = useState({
    template: 'template1',
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentSection, setCurrentSection] = useState('personal-info');

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
    const skillIndex = formData.skills.length;
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

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Resume Generator</h2>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setCurrentSection('personal-info')}>Personal Information</button>
          <button onClick={() => setCurrentSection('summary')}>Summary</button>
          <button onClick={() => setCurrentSection('experience')}>Experience</button>
          <button onClick={() => setCurrentSection('education')}>Education</button>
          <button onClick={() => setCurrentSection('skills')}>Skills</button>
          <button onClick={() => setCurrentSection('projects')}>Projects</button>
          <button onClick={() => setCurrentSection('template')}>Template</button>
        </nav>
      </aside>
      <main className="main-content">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-header">
            <h1>{currentSection.replace('-', ' ').toUpperCase()}</h1>
          </div>
          <div className="form-body">
            {currentSection === 'personal-info' && (
              <div className="form-section" id="personal-info">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name || ''} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email || ''} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" className="form-control" id="phone" name="phone" onChange={handleChange} value={formData.phone || ''} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input type="text" className="form-control" id="address" name="address" onChange={handleChange} value={formData.address || ''} />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location:</label>
                  <input type="text" className="form-control" id="location" name="location" onChange={handleChange} value={formData.location || ''} />
                </div>
                <div className="form-group">
                  <label htmlFor="website">Personal Website:</label>
                  <input type="text" className="form-control" id="website" name="website" onChange={handleChange} value={formData.website || ''} />
                </div>
              </div>
            )}

            {currentSection === 'summary' && (
              <div className="form-section" id="summary">
                <div className="form-group">
                  <label htmlFor="summary">Summary:</label>
                  <textarea className="form-control" id="summary" name="summary" onChange={handleChange} value={formData.summary || ''}></textarea>
                </div>
              </div>
            )}

            {currentSection === 'experience' && (
              <div className="form-section" id="experience">
                {formData.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="form-group">
                      <label htmlFor={`experience_title_${index}`}>Title:</label>
                      <input type="text" className="form-control" id={`experience_title_${index}`} name={`experience_title_${index}`} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} value={exp.title} />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`experience_company_${index}`}>Company:</label>
                      <input type="text" className="form-control" id={`experience_company_${index}`} name={`experience_company_${index}`} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} value={exp.company} />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`experience_location_${index}`}>Location:</label>
                      <input type="text" className="form-control" id={`experience_location_${index}`} name={`experience_location_${index}`} onChange={(e) => handleExperienceChange(index, 'location', e.target.value)} value={exp.location} />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`experience_dates_${index}`}>Dates:</label>
                      <input type="text" className="form-control" id={`experience_dates_${index}`} name={`experience_dates_${index}`} onChange={(e) => handleExperienceChange(index, 'dates', e.target.value)} value={exp.dates} />
                    </div>
                    {exp.responsibilities.map((res, resIndex) => (
                      <div key={resIndex} className="form-group">
                        <label htmlFor={`experience_responsibilities_${index}_${resIndex}`}>Responsibility:</label>
                        <input type="text" className="form-control" id={`experience_responsibilities_${index}_${resIndex}`} name={`experience_responsibilities_${index}_${resIndex}`} onChange={(e) => handleExperienceResponsibilityChange(index, resIndex, e.target.value)} value={res} />
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => handleExperienceResponsibilityChange(index, exp.responsibilities.length, '')}>Add Responsibility</button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddExperience}>Add Experience</button>
              </div>
            )}

            {currentSection === 'education' && (
              <div className="form-section" id="education">
                {formData.education.map((edu, index) => (
                  <div key={index}>
                    <div className="form-group">
                      <label htmlFor={`education_institution_${index}`}>Institution:</label>
                      <input type="text" className="form-control" id={`education_institution_${index}`} name={`education_institution_${index}`} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} value={edu.institution} />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`education_city_${index}`}>City:</label>
                      <input type="text" className="form-control" id={`education_city_${index}`} name={`education_city_${index}`} onChange={(e) => handleEducationChange(index, 'city', e.target.value)} value={edu.city} />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`education_degree_${index}`}>Degree:</label>
                      <input type="text" className="form-control" id={`education_degree_${index}`} name={`education_degree_${index}`} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} value={edu.degree} />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`education_dates_${index}`}>Dates:</label>
                      <input type="text" className="form-control" id={`education_dates_${index}`} name={`education_dates_${index}`} onChange={(e) => handleEducationChange(index, 'dates', e.target.value)} value={edu.dates} />
                    </div>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddEducation}>Add Education</button>
              </div>
            )}

            {currentSection === 'skills' && (
              <div className="form-section" id="skills">
                <div className="form-group">
                  <label htmlFor="skills_header">Skills Header:</label>
                  <input type="text" className="form-control" id="skills_header" name="skills_header" onChange={handleChange} value={formData.skills_header || 'Skills'} />
                </div>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="skill-entry">
                    <div className="form-group">
                      <label htmlFor={`skill_name_${index}`}>Skill Name:</label>
                      <input type="text" className="form-control" id={`skill_name_${index}`} name={`skill_name_${index}`} onChange={(e) => handleSkillChange(index, 'name', e.target.value)} value={skill.name} />
                    </div>
                    {skill.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="skill-detail form-group">
                        <input type="text" className="form-control" id={`skill_${index}_detail_${detailIndex}`} name={`skill_${index}_detail_${detailIndex}`} onChange={(e) => handleSkillDetailChange(index, detailIndex, e.target.value)} value={detail} />
                        <button type="button" className="btn btn-danger" onClick={() => handleRemoveSkillDetail(index, detailIndex)}>-</button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => handleSkillDetailChange(index, skill.details.length, '')}>+</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveSkill(index)}>Remove Skill</button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddSkill}>Add Skill</button>
              </div>
            )}

            {currentSection === 'projects' && (
              <div className="form-section" id="projects">
                {formData.projects.map((proj, index) => (
                  <div key={index}>
                    <div className="form-group">
                      <label htmlFor={`project_title_${index}`}>Title:</label>
                      <input type="text" className="form-control" id={`project_title_${index}`} name={`project_title_${index}`} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} value={proj.title} />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`project_tech_stack_${index}`}>Tech Stack:</label>
                      <input type="text" className="form-control" id={`project_tech_stack_${index}`} name={`project_tech_stack_${index}`} onChange={(e) => handleProjectChange(index, 'tech_stack', e.target.value)} value={proj.tech_stack} />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`project_dates_${index}`}>Dates:</label>
                      <input type="text" className="form-control" id={`project_dates_${index}`} name={`project_dates_${index}`} onChange={(e) => handleProjectChange(index, 'dates', e.target.value)} value={proj.dates} />
                    </div>
                    {proj.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="form-group">
                        <label htmlFor={`project_details_${index}_${detailIndex}`}>Detail:</label>
                        <input type="text" className="form-control" id={`project_details_${index}_${detailIndex}`} name={`project_details_${index}_${detailIndex}`} onChange={(e) => handleProjectDetailChange(index, detailIndex, e.target.value)} value={detail} />
                        <button type="button" className="btn btn-danger" onClick={() => handleRemoveProjectDetail(index, detailIndex)}>-</button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => handleProjectDetailChange(index, proj.details.length, '')}>Add Detail</button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddProject}>Add Project</button>
              </div>
            )}

            {currentSection === 'template' && (
              <div className="form-section" id="template">
                <div className="form-group">
                  <label htmlFor="template">Choose Template:</label>
                  <select className="form-control" id="template" name="template" onChange={handleChange} value={formData.template || 'template1'}>
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-success">Generate Resume</button>
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
