"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import PdfBox from '/components/PdfBox';
import Sidebar from '/components/Sidebar';
import MainForm from '/components/MainForm';

const initialFormData = {
  template: 'template1',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  name: '',
  summary: '',
  personalInfo: [
    { label: 'Email', value: '', link: '', placeholder: 'john.doe@example.com', removable: false, isLink: false },
    { label: 'Phone', value: '', link: '', placeholder: '+1(234)567-8901', removable: false, isLink: false },
    { label: 'GitHub', value: '', link: '', placeholder: 'Github/username', removable: false, isLink: false },
    { label: 'LinkedIn', value: '', link: '', placeholder: 'Linkedin/username', removable: false, isLink: false }
  ],
  sectionOrder: ['personal-info', 'summary', 'education', 'experience', 'projects', 'skills'], // default section order
};

export default function Home() {
  const [formData, setFormData] = useState(initialFormData);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [latexSource, setLatexSource] = useState('');
  const [currentSection, setCurrentSection] = useState('personal-info');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sectionOrder, setSectionOrder] = useState(initialFormData.sectionOrder);

  useEffect(() => {
    const savedData = localStorage.getItem('savedFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setSectionOrder(parsedData.sectionOrder || initialFormData.sectionOrder);
    }
  }, []);

  useEffect(() => {
    const dataToSave = { ...formData, sectionOrder };
    localStorage.setItem('savedFormData', JSON.stringify(dataToSave));
  }, [formData, sectionOrder]);

  const handleChange = (e, index = null, section = null) => {
    if (section === 'personalInfo') {
      const newPersonalInfo = [...formData.personalInfo];
      newPersonalInfo[index].value = e.target.value;
      setFormData({ ...formData, personalInfo: newPersonalInfo });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  function escapeLatex(str) {
    if (!str) return str;
    return str
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/_/g, '\\_')
      .replace(/#/g, '\\#')
      .replace(/{/g, '\\{')
      .replace(/}/g, '\\}')
      .replace(/~/g, '\\textasciitilde{}')
      .replace(/\^/g, '\\^{}')
      .replace(/\$/g, '\\$');
  }

  const handleLinkChange = (e, index) => {
    const newPersonalInfo = [...formData.personalInfo];
    let linkValue = e.target.value.trim();
    if (!linkValue.startsWith('http://') && !linkValue.startsWith('https://')) {
      linkValue = `https://${linkValue}`;
    }
    newPersonalInfo[index].link = linkValue;
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

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: '', city: '', degree: '', dates: '', gpa: '' }],
    });
  };

  const handleEducationChange = (updatedEducation) => {
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleEducationFieldChange = (index, field, value) => {
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

  const handleExperienceChange = (updatedExperiences) => {
    setFormData({ ...formData, experience: updatedExperiences });
  };

  const handleExperienceFieldChange = (index, field, value) => {
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
      projects: [...formData.projects, { title: '', tech_stack: '', dates: '', details: [''], detailDisplay: 'dotted', link: '' }],
    });
  };

  const handleProjectFieldChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const handleProjectChange = (updatedProjects) => {
    setFormData({ ...formData, projects: updatedProjects });
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

  const handleRemoveExperience = (index) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    setFormData({ ...formData, experience: newExperience });
  };

  const handleRemoveResponsibility = (expIndex, resIndex) => {
    const newExperience = [...formData.experience];
    newExperience[expIndex].responsibilities.splice(resIndex, 1);
    setFormData({ ...formData, experience: newExperience });
  };

  const handleRemoveEducation = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({ ...formData, education: newEducation });
  };

  const handleRemoveProject = (index) => {
    const newProjects = [...formData.projects];
    newProjects.splice(index, 1);
    setFormData({ ...formData, projects: newProjects });
  };

  const handleSkillChange = (updatedSkills) => {
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSkillFieldChange = (index, field, value) => {
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

  const handleDetailDisplayChange = (index, value) => {
    const newProjects = [...formData.projects];
    newProjects[index].detailDisplay = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const handleRemoveProjectDetail = (projIndex, detailIndex) => {
    const newProjects = [...formData.projects];
    newProjects[projIndex].details.splice(detailIndex, 1);
    setFormData({ ...formData, projects: newProjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Escape data for LaTeX rendering
      const formattedData = {
        ...formData,
        personalInfo: formData.personalInfo.map(info => ({
          ...info,
          value: escapeLatex(info.value),
          link: escapeLatex(info.link)
        })),
        name: escapeLatex(formData.name),
        summary: escapeLatex(formData.summary),
        education: formData.education.map(edu => ({
          institution: escapeLatex(edu.institution),
          city: escapeLatex(edu.city),
          degree: escapeLatex(edu.degree),
          dates: escapeLatex(edu.dates),
          gpa: escapeLatex(edu.gpa)
        })),
        experience: formData.experience.map(exp => ({
          title: escapeLatex(exp.title),
          company: escapeLatex(exp.company),
          location: escapeLatex(exp.location),
          dates: escapeLatex(exp.dates),
          responsibilities: exp.responsibilities.map(res => escapeLatex(res))
        })),
        projects: formData.projects.map(proj => ({
          title: escapeLatex(proj.title),
          tech_stack: escapeLatex(proj.tech_stack),
          dates: escapeLatex(proj.dates),
          details: proj.details.map(detail => escapeLatex(detail)),
          detailDisplay: proj.detailDisplay,
          link: escapeLatex(proj.link) // Add the link here
        })),
        skills: formData.skills.map(skill => ({
          name: escapeLatex(skill.name),
          details: skill.details.map(detail => escapeLatex(detail))
        })),
        sectionOrder // Include section order in the submitted data
      };

      const response = await axios.post('/api/generate', formattedData);
      setPdfUrl(response.data.pdfUrl);
      setLatexSource(response.data.latexSource);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="app-container flex flex-col min-h-screen">
      <button
        className="md:hidden bg-gray-900 text-white p-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        Menu
      </button>
      <div className="flex flex-grow flex-col md:flex-row">
        <Sidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setFormData={setFormData}
          initialFormData={initialFormData}
          setSectionOrder={setSectionOrder}
        />
        <main className="main-content flex-1 p-6 bg-gray-50">
          <MainForm
            handleDetailDisplayChange={handleDetailDisplayChange}
            handleRemoveExperience={handleRemoveExperience}
            handleRemoveResponsibility={handleRemoveResponsibility}
            handleRemoveEducation={handleRemoveEducation}
            handleRemoveProject={handleRemoveProject}
            handleRemoveProjectDetail={handleRemoveProjectDetail}
            currentSection={currentSection}
            formData={formData}
            handleChange={handleChange}
            handleFieldLabelChange={handleFieldLabelChange}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
            handleLinkChange={handleLinkChange}
            handleLinkToggle={handleLinkToggle}
            handleExperienceChange={handleExperienceChange}
            handleExperienceResponsibilityChange={handleExperienceResponsibilityChange}
            handleAddExperience={handleAddExperience}
            handleEducationChange={handleEducationChange}
            handleEducationFieldChange={handleEducationFieldChange}
            handleExperienceFieldChange={handleExperienceFieldChange}
            handleProjectFieldChange={handleProjectFieldChange}
            handleSkillFieldChange={handleSkillFieldChange}
            handleAddEducation={handleAddEducation}
            handleSkillChange={handleSkillChange}
            handleSkillDetailChange={handleSkillDetailChange}
            handleAddSkill={handleAddSkill}
            handleRemoveSkill={handleRemoveSkill}
            handleRemoveSkillDetail={handleRemoveSkillDetail}
            handleProjectChange={handleProjectChange}
            handleProjectDetailChange={handleProjectDetailChange}
            handleAddProject={handleAddProject}
            handleSubmit={handleSubmit}
            sectionOrder={sectionOrder}
          />
        </main>
        <section className="pdf-container flex-1 p-6 bg-gray-100 md:flex md:justify-center">
          {pdfUrl ? (
            <iframe src={pdfUrl} width="100%" height="100%"></iframe>
          ) : (
            <p>No PDF generated yet</p>
          )}
        </section>
      </div>
    </div>
  );
}
