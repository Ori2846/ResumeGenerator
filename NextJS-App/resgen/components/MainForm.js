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
  handleSubmit
}) {
  return (
    <form onSubmit={handleSubmit} className="form bg-white p-6 rounded-lg shadow-md w-full">
      <div className="form-header mb-4">
        <h1 className="text-2xl font-semibold">{currentSection.replace('-', ' ').toUpperCase()}</h1>
      </div>
      <div className="form-body w-full">
        {currentSection === 'personal-info' && (
          <PersonalInfo
            formData={formData}
            handleChange={handleChange}
            handleFieldLabelChange={handleFieldLabelChange}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
            handleLinkChange={handleLinkChange}
            handleLinkToggle={handleLinkToggle}
          />
        )}
        {currentSection === 'summary' && (
          <Summary formData={formData} handleChange={handleChange} />
        )}
        {currentSection === 'experience' && (
          <Experience
            formData={formData}
            handleExperienceChange={handleExperienceChange}
            handleExperienceResponsibilityChange={handleExperienceResponsibilityChange}
            handleAddExperience={handleAddExperience}
            handleRemoveExperience={handleRemoveExperience}
            handleRemoveResponsibility={handleRemoveResponsibility}
          />
        )}
        {currentSection === 'education' && (
          <Education
            formData={formData}
            handleEducationChange={handleEducationChange}
            handleAddEducation={handleAddEducation}
            handleRemoveEducation={handleRemoveEducation}
          />
        )}
        {currentSection === 'skills' && (
          <Skills
            formData={formData}
            handleSkillChange={handleSkillChange}
            handleSkillDetailChange={handleSkillDetailChange}
            handleAddSkill={handleAddSkill}
            handleRemoveSkill={handleRemoveSkill}
            handleRemoveSkillDetail={handleRemoveSkillDetail}
          />
        )}
        {currentSection === 'projects' && (
          <Projects
            formData={formData}
            handleProjectChange={handleProjectChange}
            handleProjectDetailChange={handleProjectDetailChange}
            handleAddProject={handleAddProject}
            handleRemoveProject={handleRemoveProject}
            handleRemoveProjectDetail={handleRemoveProjectDetail}
          />
        )}
        {currentSection === 'template' && (
          <Template formData={formData} handleChange={handleChange} />
        )}
      </div>
      {currentSection !== 'template' && (
        <button type="submit" className="btn btn-success mt-6">
          Generate Resume
        </button>
      )}
    </form>
  );
}
