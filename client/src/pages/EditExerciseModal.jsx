import React, { useState } from "react";
import "./Modal.css"; // pokud máš styly

const EditExerciseModal = ({ exercise, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    _id: exercise._id,
    name: exercise.name || "",
    description: exercise.description || "",
    status: exercise.status || "not started",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Exercise</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <div className="modal-buttons">
          <button className="button edit" onClick={handleSave}>Save</button>
          <button className="button cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditExerciseModal;