import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Select from "react-select";
import "./AddExam.css";

export default function AddExam() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/exercises/list")
      .then((res) => {
        console.log("Loaded exercises:", res.data);
        setExerciseList(res.data);
      })
      .catch((err) => console.error("Error fetching exercises:", err));
  }, []);

  // Připravíme options pro react-select
  const options = useMemo(() => {
    return exerciseList.map((exercise) => ({
      value: exercise._id,
      label: exercise.name
    }));
  }, [exerciseList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter the exam name.");
      return;
    }

    const examData = {
      name,
      description,
      exerciseIds: selectedExercises.map((ex) => ex.value),
    };

    console.log("Submitting exam:", examData);

    axios.post("http://localhost:3001/exams/add", examData)
      .then(() => {
        alert("Exam added successfully!");
        setName("");
        setDescription("");
        setSelectedExercises([]);
      })
      .catch((err) => {
        console.error("Error adding exam:", err);
        alert("Failed to add exam.");
      });
  };

  return (
    <div className="add-exam">
      <h1>Add Exam</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Exam Name:
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
          Select Exercises:
          <Select
            options={options}
            isMulti
            value={selectedExercises}
            onChange={(selected) => {
              console.log("Selected exercises:", selected);
              setSelectedExercises(selected || []);
            }}
            className="exercise-select"
            classNamePrefix="select"
            placeholder="Choose one or more exercises"
          />
        </label>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}