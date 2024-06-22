export default function Summary({ formData, handleChange }) {
    return (
      <div className="col-span-1">
        <div className="form-group">
          <label htmlFor="summary" className="form-label">Summary:</label>
          <textarea className="form-control" id="summary" name="summary" onChange={handleChange} value={formData.summary || ''} placeholder="Professional summary..."></textarea>
        </div>
      </div>
    );
  }
  