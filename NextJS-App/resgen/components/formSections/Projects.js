// components/formSections/Projects.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ConfirmationModal from './ConfirmationModal';

export default function Projects({
  formData,
  handleProjectChange,
  handleProjectFieldChange,
  handleProjectDetailChange,
  handleAddProject,
  handleRemoveProject,
  handleRemoveProjectDetail,
  handleDetailDisplayChange
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
    handleRemoveProject(itemToRemove);
    handleCloseModal();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedProjects = Array.from(formData.projects);
    const [movedProject] = reorderedProjects.splice(result.source.index, 1);
    reorderedProjects.splice(result.destination.index, 0, movedProject);

    handleProjectChange(reorderedProjects);
  };

  const handleDetailInputChange = (index, value) => {
    const newProjects = [...formData.projects];
    newProjects[index].details = value.split('\n');
    handleProjectChange(newProjects);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {formData.projects.map((proj, index) => (
                <Draggable key={index} draggableId={`project-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                      <div className="form-group">
                        <label htmlFor={`project_title_${index}`} className="form-label">Title:</label>
                        <input type="text" className="form-control" id={`project_title_${index}`} name={`project_title_${index}`} onChange={(e) => handleProjectFieldChange(index, 'title', e.target.value)} value={proj.title} placeholder="Project Title" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`project_tech_stack_${index}`} className="form-label">Tech Stack:</label>
                        <input type="text" className="form-control" id={`project_tech_stack_${index}`} name={`project_tech_stack_${index}`} onChange={(e) => handleProjectFieldChange(index, 'tech_stack', e.target.value)} value={proj.tech_stack} placeholder="Tech Stack" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`project_dates_${index}`} className="form-label">Dates:</label>
                        <input type="text" className="form-control" id={`project_dates_${index}`} name={`project_dates_${index}`} onChange={(e) => handleProjectFieldChange(index, 'dates', e.target.value)} value={proj.dates} placeholder="MM/YYYY - MM/YYYY" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`project_link_${index}`} className="form-label">Project Link:</label>
                        <input type="text" className="form-control" id={`project_link_${index}`} name={`project_link_${index}`} onChange={(e) => handleProjectFieldChange(index, 'link', e.target.value)} value={proj.link || ''} placeholder="https://example.com" />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`project_detail_display_${index}`} className="form-label">Detail Display:</label>
                        <select className="form-control" id={`project_detail_display_${index}`} name={`project_detail_display_${index}`} onChange={(e) => handleDetailDisplayChange(index, e.target.value)} value={proj.detailDisplay}>
                          <option value="dotted">Dotted</option>
                          <option value="paragraph">Paragraph</option>
                        </select>
                      </div>
                      <div className="form-group">
                        {proj.detailDisplay === 'paragraph' ? (
                          <textarea
                            className="form-control"
                            id={`project_details_${index}`}
                            name={`project_details_${index}`}
                            onChange={(e) => handleDetailInputChange(index, e.target.value)}
                            value={proj.details.join('\n')}
                            placeholder="Enter details as a paragraph"
                          />
                        ) : (
                          proj.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="form-group flex items-center">
                              <input type="text" className="form-control" id={`project_details_${index}_${detailIndex}`} name={`project_details_${index}_${detailIndex}`} onChange={(e) => handleProjectDetailChange(index, detailIndex, e.target.value)} value={detail} placeholder="Detail" />
                              <button type="button" className="btn btn-danger ml-2" onClick={() => handleRemoveProjectDetail(index, detailIndex)}>
                                -
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                      {proj.detailDisplay !== 'paragraph' && (
                        <button type="button" className="btn btn-secondary mt-2" onClick={() => handleProjectDetailChange(index, proj.details.length, '')}>
                          Add Detail
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => handleShowModal(index)}
                      >
                        Remove Project
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
      <button type="button" className="btn btn-success mt-4" onClick={handleAddProject}>
        Add Project
      </button>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmRemove}
      />
    </div>
  );
}
