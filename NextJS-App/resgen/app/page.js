"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import './globals.css';
import PdfBox from '../components/PdfBox';
import Sidebar from '../components/Sidebar';
import MainForm from '../components/MainForm';

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
      { label: 'GitHub', value: '', link: '', placeholder: 'Github/username', removable: false, isLink: false },
      { label: 'LinkedIn', value: '', link: '', placeholder: 'Linkedin/username', removable: false, isLink: false }
    ],
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [latexSource, setLatexSource] = useState('');
  const [currentSection, setCurrentSection] = useState('personal-info');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const replaceLatexSlash = (str) => {
    if (!str) return str;
    return str.replace(/\\slash\{\}/g, '/');
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      const processedFormData = {
        ...savedFormData,
        personalInfo: savedFormData.personalInfo ? savedFormData.personalInfo.map(info => ({
          ...info,
          value: replaceLatexSlash(info.value),
          link: replaceLatexSlash(info.link)
        })) : [],
        name: replaceLatexSlash(savedFormData.name),
        education: savedFormData.education ? savedFormData.education.map(edu => ({
          ...edu,
          institution: replaceLatexSlash(edu.institution),
          city: replaceLatexSlash(edu.city),
          degree: replaceLatexSlash(edu.degree),
          dates: replaceLatexSlash(edu.dates)
        })) : [],
        experience: savedFormData.experience ? savedFormData.experience.map(exp => ({
          ...exp,
          title: replaceLatexSlash(exp.title),
          company: replaceLatexSlash(exp.company),
          location: replaceLatexSlash(exp.location),
          dates: replaceLatexSlash(exp.dates),
          responsibilities: exp.responsibilities ? exp.responsibilities.map(res => replaceLatexSlash(res)) : []
        })) : [],
        projects: savedFormData.projects ? savedFormData.projects.map(proj => ({
          ...proj,
          title: replaceLatexSlash(proj.title),
          tech_stack: replaceLatexSlash(proj.tech_stack),
          dates: replaceLatexSlash(proj.dates),
          details: proj.details ? proj.details.map(detail => replaceLatexSlash(detail)) : []
        })) : [],
        skills: savedFormData.skills ? savedFormData.skills.map(skill => ({
          ...skill,
          name: replaceLatexSlash(skill.name),
          details: skill.details ? skill.details.map(detail => replaceLatexSlash(detail)) : []
        })) : []
      };
      setFormData(processedFormData);
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

  const escapeLatex = (str) => {
    if (!str) return str;
    return str.replace(/&/g, '\\&')
              .replace(/%/g, '\\%')
              .replace(/_/g, '\\_')
              .replace(/#/g, '\\#')
              .replace(/{/g, '\\{')
              .replace(/}/g, '\\}')
              .replace(/~/g, '\\textasciitilde{}')
              .replace(/\^/g, '\\^{}')
              .replace(/\\/g, '\\textbackslash{}')
              .replace(/\$/g, '\\$');
    // Note: we removed the .replace(/\//g, '\\slash{}')
  };
  
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
      const processedPersonalInfo = formData.personalInfo
        .filter(info => info.value.trim() !== "")
        .map((info, index, array) => {
          if (index === 0) {
            info.link = `mailto:${escapeLatex(info.value)}`;
          } else if (index === 1) {
            const digitsOnly = info.value.replace(/\D/g, '');
            info.link = `tel:${digitsOnly}`;
          } else {
            info.link = info.link; // Keep link unescaped
            info.value = escapeLatex(info.value); // Escape value
          }
          return {
            ...info,
            last: index === array.length - 1,
          };
        });

      const formattedData = {
        ...formData,
        personalInfo: processedPersonalInfo,
        name: escapeLatex(formData.name),
        education: formData.education.map(edu => ({
          ...edu,
          institution: escapeLatex(edu.institution),
          city: escapeLatex(edu.city),
          degree: escapeLatex(edu.degree),
          dates: escapeLatex(edu.dates)
        })),
        experience: formData.experience.map(exp => ({
          ...exp,
          title: escapeLatex(exp.title),
          company: escapeLatex(exp.company),
          location: escapeLatex(exp.location),
          dates: escapeLatex(exp.dates),
          responsibilities: exp.responsibilities.map(res => escapeLatex(res))
        })),
        projects: formData.projects.map(proj => ({
          ...proj,
          title: escapeLatex(proj.title),
          tech_stack: escapeLatex(proj.tech_stack),
          dates: escapeLatex(proj.dates),
          details: proj.details.map(detail => escapeLatex(detail))
        })),
        skills: formData.skills.map(skill => ({
          ...skill,
          name: escapeLatex(skill.name),
          details: skill.details.map(detail => escapeLatex(detail))
        }))
      };

      const response = await axios.post('/api/generate', formattedData);
      setPdfUrl(response.data.pdfUrl);
      setLatexSource(response.data.latexSource);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="app-container flex">
      <button
        className="md:hidden bg-gray-900 text-white p-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        Menu
      </button>
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        isSidebarOpen={isSidebarOpen} // Pass isSidebarOpen here
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="main-content flex-1 p-6 bg-gray-50">
        <MainForm
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
          handleAddEducation={handleAddEducation}
          handleSkillChange={handleSkillChange}
          handleSkillDetailChange={handleSkillDetailChange}
          handleAddSkill={handleAddSkill}
          handleRemoveSkill={handleRemoveSkill}
          handleRemoveSkillDetail={handleRemoveSkillDetail}
          handleProjectChange={handleProjectChange}
          handleProjectDetailChange={handleProjectDetailChange}
          handleAddProject={handleAddProject}
          handleRemoveProjectDetail={handleRemoveProjectDetail}
          handleSubmit={handleSubmit}
        />
      </main>
      <section className="pdf-container p-6">
        <PdfBox pdfUrl={pdfUrl} formData={formData} latexSource={latexSource} />
      </section>
    </div>
  );
}
