import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddExam from "./pages/AddExam";
import AddExercise from "./pages/AddExercise";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-exam" element={<AddExam />} />
          <Route path="add-exercise" element={<AddExercise />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;