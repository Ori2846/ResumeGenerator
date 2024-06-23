import React from 'react';
import './ConfirmationModal.css';

function ConfirmationModal({ show, handleClose, handleConfirm }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Removal</h5>
          <button type="button" className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          Are you sure you want to remove this item?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger red-button" onClick={handleConfirm}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
