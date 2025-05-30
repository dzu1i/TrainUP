const express = require("express");
const router = express.Router();

const addExerciseAbl = require("../abl/exercises/addExercise");
const editExerciseAbl = require("../abl/exercises/editExercise");
const listExercisesAbl = require("../abl/exercises/listExercises");
const trackExerciseAbl = require("../abl/exercises/trackExercise");

router.post("/add", addExerciseAbl);
router.post("/edit", editExerciseAbl);
router.get("/list", listExercisesAbl);
router.post("/track", trackExerciseAbl);

module.exports = router;
