// components/formSections/Template.js
export default function Template({ formData, handleChange }) {
  const templates = [
    { id: 'template1', name: 'Template 1', imageUrl: '/images/template1.png' },
    { id: 'template2', name: 'Template 2', imageUrl: '/images/template2.png' },
  ];

  return (
    <div className="w-full">
      <div className="form-group">
        <label htmlFor="template" className="form-label">Choose Template:</label>
        <select
          className="form-control"
          id="template"
          name="template"
          onChange={handleChange}
          value={formData.template || 'template1'}
        >
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>
      <div className="template-examples mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(template => (
          <div key={template.id} className="template-example border rounded-lg p-4">
            <img src={template.imageUrl} alt={template.name} className="w-full h-auto mb-4" />
            <button
              onClick={() => handleChange({ target: { name: 'template', value: template.id } })}
              className={`btn ${formData.template === template.id ? 'btn-success' : 'btn-secondary'} w-full`}
            >
              {formData.template === template.id ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
