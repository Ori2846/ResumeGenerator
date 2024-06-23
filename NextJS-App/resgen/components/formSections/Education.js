import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function Education({ formData, handleEducationChange, handleAddEducation, handleRemoveEducation }) {
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
    handleRemoveEducation(itemToRemove);
    handleCloseModal();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Education</h2>
      {formData.education.map((edu, index) => (
        <React.Fragment key={index}>
          <div className="form-group mb-4">
            <h3 className="text-lg font-semibold">Education {index + 1}</h3>
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
            <div className="form-group">
              <label htmlFor={`education_gpa_${index}`} className="form-label">GPA:</label>
              <input type="text" className="form-control" id={`education_gpa_${index}`} name={`education_gpa_${index}`} onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)} value={edu.gpa} placeholder="GPA (optional)" />
            </div>
            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={() => handleShowModal(index)}
            >
              Remove Education
            </button>
          </div>
          {index < formData.education.length - 1 && <hr className="divider" />} {/* Divider */}
        </React.Fragment>
      ))}
      <button type="button" className="btn btn-success mt-4" onClick={handleAddEducation}>
        Add Education
      </button>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmRemove}
      />
    </div>
  );
}
