import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import "./Modal.css";

const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [expandedExamId, setExpandedExamId] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);
  const [editingExam, setEditingExam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examsRes = await axios.get("http://localhost:3001/exams/list");
        const exercisesRes = await axios.get("http://localhost:3001/exercises/list");

        setExams(examsRes.data);
        setExercises(exercisesRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (examId) => {
    setExpandedExamId((prev) => (prev === examId ? null : examId));
  };

  const handleStatusChange = async (exerciseId, newStatus) => {
    try {
      await axios.post("http://localhost:3001/exercises/track", {
        id: exerciseId,
        status: newStatus,
      });

      setExercises((prev) =>
        prev.map((ex) => (ex._id === exerciseId ? { ...ex, status: newStatus } : ex))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditExercise = (exercise) => {
    setEditingExercise({ ...exercise });
  };

  const handleSaveExercise = async () => {
    try {
      const { _id, name, description, status } = editingExercise;
      await axios.post("http://localhost:3001/exercises/edit", {
        id: editingExam._id,
        name: editingExam.name,
        description: editingExam.description,
        exercises: editingExam.exercises,
    });

    setExercises((prev) =>
      prev.map((ex) => (ex._id === _id ? { ...ex, name, description, status } : ex))
    );
    setEditingExercise(null);
  } catch (error) {
    console.error("Update failed", error);
  }
};

  const handleEditExam = (exam) => {
    setEditingExam({ ...exam, exercises: exam.exercises || [] });
  };

  const handleSaveExam = async () => {
    try {
      await axios.post("http://localhost:3001/exams/edit", {
        id: editingExam._id,
        name: editingExam.name,
        description: editingExam.description,
        exercises: editingExam.exercises.map(ex => typeof ex === "string" ? ex : ex._id),
      });

      setExams((prev) =>
        prev.map((ex) =>
          ex._id === editingExam._id ? { ...editingExam } : ex
        )
      );
      setEditingExam(null);
    } catch (error) {
      console.error("Exam update failed", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Exams</h2>

      {exams.map((exam) => {
        const examExercises = exercises.filter((ex) =>
          exam.exercises.includes(ex._id)
        );

        const completedCount = examExercises.filter(
          (ex) => ex.status === "completed"
        ).length;
        const progressPercent = examExercises.length
          ? Math.round((completedCount / examExercises.length) * 100)
          : 0;

        return (
          <div className="exam-card" key={exam._id}>
            <div className="exam-header">
              <h3 onClick={() => toggleExpand(exam._id)}>{exam.name}</h3>
              <button className="button edit" onClick={() => handleEditExam(exam)}>edit</button>
            </div>
            <p>{exam.description}</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p>{progressPercent}% completed</p>
            {expandedExamId === exam._id && (
              <ul className="exercise-list">
                {examExercises.map((ex) => (
                  <li key={ex._id}>
                    <span>{ex.name}</span>
                    <select
                      className={`status-select status-${ex.status.replace(" ", "-")}`}
                      value={ex.status}
                      onChange={(e) => handleStatusChange(ex._id, e.target.value)}
                    >
                      <option value="not started">not started</option>
                      <option value="in progress">in progress</option>
                      <option value="completed">completed</option>
                    </select>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      <h3>All Exercises</h3>
      <ul className="all-exercises">
        {exercises.map((ex) => (
          <li key={ex._id}>
            <div className="exercise-info">
              <div className="exercise-name">{ex.name}</div>
              {ex.description && (
                <div className="exercise-description">{ex.description}</div>
              )}
            </div>
            <select
              className={`status-select status-${ex.status.replace(" ", "-")}`}
              value={ex.status}
              onChange={(e) => handleStatusChange(ex._id, e.target.value)}
            >
              <option value="not started">not started</option>
              <option value="in progress">in progress</option>
              <option value="completed">completed</option>
            </select>
            <button className="button edit" onClick={() => handleEditExercise(ex)}>edit</button>
          </li>
        ))}
      </ul>

      {editingExercise && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit Exercise</h4>
            <input
              type="text"
              value={editingExercise.name}
              onChange={(e) =>
                setEditingExercise({ ...editingExercise, name: e.target.value })
              }
            />
            <textarea
              value={editingExercise.description}
              onChange={(e) =>
                setEditingExercise({
                  ...editingExercise,
                  description: e.target.value,
                })
              }
            />
            <button className="button edit" onClick={handleSaveExercise}>Save</button>
            <button className="button edit" onClick={() => setEditingExercise(null)}>Cancel</button>
          </div>
        </div>
      )}

      {editingExam && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit Exam</h4>
            <input
              type="text"
              value={editingExam.name}
              onChange={(e) =>
                setEditingExam({ ...editingExam, name: e.target.value })
              }
            />
            <textarea
              value={editingExam.description}
              onChange={(e) =>
                setEditingExam({ ...editingExam, description: e.target.value })
              }
            />
            <div className="dropdown-container">
              <label>Exercises:</label>
              <div className="dropdown-menu">
                {exercises.map((ex) => (
                  <label key={ex._id} className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={editingExam.exercises.includes(ex._id)}
                      onChange={(e) => {
                        const selected = editingExam.exercises.includes(ex._id);
                        const newExercises = selected
                          ? editingExam.exercises.filter(id => id !== ex._id)
                          : [...editingExam.exercises, ex._id];
                        setEditingExam({ ...editingExam, exercises: newExercises });
                      }}
                    />
                    {ex.name}
                  </label>
                ))}
              </div>
            </div>
            <button className="button edit" onClick={handleSaveExam}>Save</button>
            <button className="button edit" onClick={() => setEditingExam(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
