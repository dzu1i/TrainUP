const { ObjectId } = require("mongodb");
const examDao = require("../../dao/exam-dao");
const exerciseDao = require("../../dao/exercise-dao");

async function getProgress(req, res) {
  try {
    const { id } = req.params;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Missing or invalid exam ID" });
    }

    const exam = await examDao.get(id);

    if (!exam || !exam.exerciseIds || exam.exerciseIds.length === 0) {
      return res.json({ progress: 0 });
    }

    const exercises = await Promise.all(
      exam.exerciseIds.map(exId => exerciseDao.get(exId.toString()))
    );

    const total = exercises.length;
    const completed = exercises.filter(e => e.status === "completed").length;
    const progress = Math.round((completed / total) * 100);

    res.json({ progress });
  } catch (e) {
    console.error("Failed to get progress:", e);
    res.status(500).json({ message: "Failed to get progress", error: e.message });
  }
}

module.exports = getProgress;
