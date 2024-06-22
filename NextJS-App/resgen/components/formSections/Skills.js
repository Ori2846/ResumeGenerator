export default function Skills({ formData, handleSkillChange, handleSkillDetailChange, handleAddSkill, handleRemoveSkill, handleRemoveSkillDetail }) {
    return (
      <div className="col-span-1">
        <div className="form-group">
          <label htmlFor="skills_header" className="form-label">Skills Header:</label>
          <input type="text" className="form-control" id="skills_header" name="skills_header" onChange={handleSkillChange} value={formData.skills_header || 'Skills'} placeholder="Skills Header" />
        </div>
        {formData.skills.map((skill, index) => (
          <div key={index} className="form-group">
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
            <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveSkill(index)}>
              Remove Skill
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-success mt-4" onClick={handleAddSkill}>
          Add Skill
        </button>
      </div>
    );
  }
  