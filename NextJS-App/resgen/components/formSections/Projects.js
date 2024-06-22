export default function Projects({ formData, handleProjectChange, handleProjectDetailChange, handleAddProject, handleRemoveProjectDetail }) {
    return (
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
                <button type="button" className="btn btn-danger ml-2" onClick={() => handleRemoveProjectDetail(index, detailIndex)}>
                  -
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={() => handleProjectDetailChange(index, proj.details.length, '')}>
              Add Detail
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-success mt-4" onClick={handleAddProject}>
          Add Project
        </button>
      </div>
    );
  }
  