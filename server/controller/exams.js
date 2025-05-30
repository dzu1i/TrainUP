const express = require("express");
const router = express.Router();

const addExamAbl = require("../abl/exams/addExam");
const editExamAbl = require("../abl/exams/editExam");
const listExamsAbl = require("../abl/exams/listExams");
const getProgressAbl = require("../abl/exams/getProgress");

router.post("/add", addExamAbl);
router.post("/edit", editExamAbl);
router.get("/list", listExamsAbl);
router.get("/progress/:id", getProgressAbl); 

module.exports = router;
