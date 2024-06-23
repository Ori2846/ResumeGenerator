import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function PersonalInfo({ formData, handleChange, handleFieldLabelChange, handleAddField, handleRemoveField, handleLinkChange, handleLinkToggle }) {
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
    handleRemoveField(itemToRemove);
    handleCloseModal();
  };

  return (
    <div className="w-full">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name || ''} placeholder="John Doe" />
      </div>
      {formData.personalInfo.map((info, index) => (
        <div key={index} className="form-group">
          <input
            type="text"
            className="form-label-input"
            onChange={(e) => handleFieldLabelChange(e, index)}
            value={info.label}
            placeholder="Label"
          />
          <input
            type="text"
            className="form-control"
            onChange={(e) => handleChange(e, index, 'personalInfo')}
            value={info.value}
            placeholder={info.placeholder}
          />
          {info.isLink && index > 1 && (
            <input
              type="text"
              className="form-control mt-2"
              onChange={(e) => handleLinkChange(e, index)}
              value={info.link}
              placeholder="Enter URL"
            />
          )}
          {info.removable && (
            <button
              type="button"
              className="btn-remove"
              onClick={() => handleShowModal(index)}
            >
              ✕
            </button>
          )}
          {index > 1 && (
            <label className="form-label inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                onChange={() => handleLinkToggle(index)}
                checked={info.isLink}
              />
              <span className="ml-2">Is Link</span>
            </label>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-secondary mt-4" onClick={handleAddField}>
        Add Field
      </button>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmRemove}
      />
    </div>
  );
}
