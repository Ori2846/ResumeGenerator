// components/formSections/Experience.js
export default function Experience({ formData, handleExperienceChange, handleExperienceResponsibilityChange, handleAddExperience, handleRemoveExperience, handleRemoveResponsibility }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} className="form-group mb-4">
          <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
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
            <div key={resIndex} className="form-group flex items-center">
              <input type="text" className="form-control" id={`experience_responsibilities_${index}_${resIndex}`} name={`experience_responsibilities_${index}_${resIndex}`} onChange={(e) => handleExperienceResponsibilityChange(index, resIndex, e.target.value)} value={res} placeholder="Responsibility" />
              <button type="button" className="btn btn-danger ml-2" onClick={() => handleRemoveResponsibility(index, resIndex)}>
                -
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-secondary mt-2" onClick={() => handleExperienceResponsibilityChange(index, exp.responsibilities.length, '')}>
            Add Responsibility
          </button>
          <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveExperience(index)}>
            Remove Experience
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-success mt-4" onClick={handleAddExperience}>
        Add Experience
      </button>
    </div>
  );
}
