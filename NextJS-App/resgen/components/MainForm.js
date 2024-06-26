// MainForm.js
import PersonalInfo from './formSections/PersonalInfo';
import Summary from './formSections/Summary';
import Experience from './formSections/Experience';
import Education from './formSections/Education';
import Skills from './formSections/Skills';
import Projects from './formSections/Projects';
import Template from './formSections/Template';

export default function MainForm({
  currentSection,
  formData,
  handleChange,
  handleFieldLabelChange,
  handleAddField,
  handleRemoveField,
  handleLinkChange,
  handleLinkToggle,
  handleExperienceChange,
  handleExperienceResponsibilityChange,
  handleAddExperience,
  handleRemoveExperience,
  handleRemoveResponsibility,
  handleEducationChange,
  handleAddEducation,
  handleEducationFieldChange,
  handleExperienceFieldChange,
  handleSkillFieldChange,
  handleFieldChange,
  handleProjectFieldChange,
  handleRemoveEducation,
  handleSkillChange,
  handleSkillDetailChange,
  handleAddSkill,
  handleRemoveSkill,
  handleRemoveSkillDetail,
  handleProjectChange,
  handleProjectDetailChange,
  handleAddProject,
  handleRemoveProject,
  handleRemoveProjectDetail,
  handleDetailDisplayChange,
  handleSubmit,
  sectionOrder
}) {

  const renderSection = () => {
    switch (currentSection) {
      case 'personal-info':
        return <PersonalInfo
          formData={formData}
          handleChange={handleChange}
          handleFieldLabelChange={handleFieldLabelChange}
          handleAddField={handleAddField}
          handleRemoveField={handleRemoveField}
          handleLinkChange={handleLinkChange}
          handleFieldChange={handleFieldChange}
          handleLinkToggle={handleLinkToggle}
        />;
      case 'summary':
        return <Summary formData={formData} handleChange={handleChange} />;
      case 'experience':
        return <Experience
          formData={formData}
          handleExperienceChange={handleExperienceChange}
          handleExperienceResponsibilityChange={handleExperienceResponsibilityChange}
          handleExperienceFieldChange={handleExperienceFieldChange}
          handleAddExperience={handleAddExperience}
          handleRemoveExperience={handleRemoveExperience}
          handleRemoveResponsibility={handleRemoveResponsibility}
        />;
      case 'education':
        return <Education
          formData={formData}
          handleEducationChange={handleEducationChange}
          handleEducationFieldChange={handleEducationFieldChange}
          handleAddEducation={handleAddEducation}
          handleRemoveEducation={handleRemoveEducation}
        />;
      case 'skills':
        return <Skills
          formData={formData}
          handleSkillChange={handleSkillChange}
          handleSkillDetailChange={handleSkillDetailChange}
          handleAddSkill={handleAddSkill}
          handleRemoveSkill={handleRemoveSkill}
          handleRemoveSkillDetail={handleRemoveSkillDetail}
          handleSkillFieldChange={handleSkillFieldChange}
        />;
      case 'projects':
        return <Projects
          formData={formData}
          handleProjectChange={handleProjectChange}
          handleProjectFieldChange={handleProjectFieldChange}
          handleProjectDetailChange={handleProjectDetailChange}
          handleAddProject={handleAddProject}
          handleRemoveProject={handleRemoveProject}
          handleRemoveProjectDetail={handleRemoveProjectDetail}
          handleDetailDisplayChange={handleDetailDisplayChange}
        />;
      case 'template':
        return <Template formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form bg-white p-6 rounded-lg shadow-md w-full">
      <div className="form-header mb-4">
        <h1 className="text-2xl font-semibold">{currentSection.replace('-', ' ').toUpperCase()}</h1>
      </div>
      <div className="form-body w-full overflow-y-auto max-h-[80vh] pr-6">
        {renderSection()}
      </div>
      {currentSection !== 'template' && (
        <button type="submit" className="btn btn-success mt-3">
          Generate Resume
        </button>
      )}
    </form>
  );
}
