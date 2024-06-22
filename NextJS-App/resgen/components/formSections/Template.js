// components/formSections/Template.js
export default function Template({ formData, handleChange }) {
  return (
    <div className="w-full">
      <div className="form-group">
        <label htmlFor="template" className="form-label">Choose Template:</label>
        <select className="form-control" id="template" name="template" onChange={handleChange} value={formData.template || 'template1'}>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>
      </div>
    </div>
  );
}
