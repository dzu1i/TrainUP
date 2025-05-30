import React, { useState } from "react";
import { postData } from "../fetch-helper";
import "./AddExercise.css";

function AddExercise({ onExerciseAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("not started");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newExercise = await postData("http://localhost:3001/exercises/add", {
        name,
        description,
        status,
      });

      if (onExerciseAdded) onExerciseAdded(newExercise);
      setName("");
      setDescription("");
      setStatus("not started");
      setError(null);
      alert("Exercise added successfully!");
    } catch (err) {
      console.error("Error adding exercise:", err);
      setError("Error communicating with the server.");
    }
  };

  return (
    <div className="add-exercise">
      <h1>Add Exercise</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Exercise Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Description (optional):
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddExercise;