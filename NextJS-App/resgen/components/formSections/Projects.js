import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function Projects({ formData, handleProjectChange, handleProjectDetailChange, handleAddProject, handleRemoveProject, handleRemoveProjectDetail }) {
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleShowModal = (index) => {
    setItemToRemove(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  const handleConfirmRemove = () => {
    handleRemoveProject(itemToRemove);
    handleCloseModal();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      {formData.projects.map((proj, index) => (
        <React.Fragment key={index}>
          <div className="form-group mb-4">
            <h3 className="text-lg font-semibold">Project {index + 1}</h3>
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
                <input type="text" className="form-control" id={`project_details_${index}_${detailIndex}`} name={`project_details_${index}_${detailIndex}`} onChange={(e) => handleProjectDetailChange(index, detailIndex, e.target.value)} value={detail} placeholder="Detail" />
                <button type="button" className="btn btn-danger ml-2" onClick={() => handleRemoveProjectDetail(index, detailIndex)}>
                  -
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={() => handleProjectDetailChange(index, proj.details.length, '')}>
              Add Detail
            </button>
            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={() => handleShowModal(index)}
            >
              Remove Project
            </button>
          </div>
          {index < formData.projects.length - 1 && <hr className="divider" />} {/* Divider */}
        </React.Fragment>
      ))}
      <button type="button" className="btn btn-success mt-4" onClick={handleAddProject}>
        Add Project
      </button>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmRemove}
      />
    </div>
  );
}
