import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function Skills({ formData, handleSkillChange, handleSkillDetailChange, handleAddSkill, handleRemoveSkill, handleRemoveSkillDetail }) {
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
    handleRemoveSkill(itemToRemove);
    handleCloseModal();
  };

  return (
    <div className="w-full">
      <div className="form-group">
        <label htmlFor="skills_header" className="form-label">Skills Header:</label>
        <input type="text" className="form-control" id="skills_header" name="skills_header" onChange={handleSkillChange} value={formData.skills_header || 'Skills'} placeholder="Skills Header" />
      </div>
      {formData.skills.map((skill, index) => (
        <React.Fragment key={index}>
          <div className="form-group mb-4">
            <div className="form-group">
              <label htmlFor={`skill_name_${index}`} className="form-label">Skill Name:</label>
              <input type="text" className="form-control" id={`skill_name_${index}`} name={`skill_name_${index}`} onChange={(e) => handleSkillChange(index, 'name', e.target.value)} value={skill.name} placeholder="Skill Name" />
            </div>
            {skill.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="form-group flex items-center">
                <input type="text" className="form-control" id={`skill_${index}_detail_${detailIndex}`} name={`skill_${index}_detail_${detailIndex}`} onChange={(e) => handleSkillDetailChange(index, detailIndex, e.target.value)} value={detail} placeholder="Detail" />
                <button type="button" className="btn btn-danger ml-2" onClick={() => handleRemoveSkillDetail(index, detailIndex)}>
                  -
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={() => handleSkillDetailChange(index, skill.details.length, '')}>
              +
            </button>
            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={() => handleShowModal(index)}
            >
              Remove Skill
            </button>
          </div>
          {index < formData.skills.length - 1 && <hr className="divider" />} {/* Divider */}
        </React.Fragment>
      ))}
      <button type="button" className="btn btn-success mt-4" onClick={handleAddSkill}>
        Add Skill
      </button>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmRemove}
      />
    </div>
  );
}
