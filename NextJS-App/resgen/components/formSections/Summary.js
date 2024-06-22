// components/formSections/Summary.js
export default function Summary({ formData, handleChange }) {
  return (
    <div className="w-full">
      <div className="form-group">
        <label htmlFor="summary" className="form-label">Summary:</label>
        <textarea className="form-control" id="summary" name="summary" onChange={handleChange} value={formData.summary || ''} placeholder="Professional summary..."></textarea>
      </div>
    </div>
  );
}
