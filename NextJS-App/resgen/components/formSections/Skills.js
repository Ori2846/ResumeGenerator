import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ConfirmationModal from './ConfirmationModal';

export default function Skills({
  formData,
  handleSkillChange,
  handleSkillFieldChange,
  handleSkillDetailChange,
  handleAddSkill,
  handleRemoveSkill,
  handleRemoveSkillDetail,
}) {
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSkills = Array.from(formData.skills);
    const [movedSkill] = reorderedSkills.splice(result.source.index, 1);
    reorderedSkills.splice(result.destination.index, 0, movedSkill);

    handleSkillChange(reorderedSkills);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skills">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {formData.skills.map((skill, index) => (
                <Draggable key={index} draggableId={`skill-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <div className="form-group">
                        <label htmlFor={`skill_name_${index}`} className="form-label">Skill Name:</label>
                        <input type="text" className="form-control" id={`skill_name_${index}`} name={`skill_name_${index}`} onChange={(e) => handleSkillFieldChange(index, 'name', e.target.value)} value={skill.name} placeholder="Skill Name" />
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
                        Add Detail
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => handleShowModal(index)}
                      >
                        Remove Skill
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
