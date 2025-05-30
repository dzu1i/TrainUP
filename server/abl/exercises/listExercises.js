const exerciseDao = require("../../dao/exercise-dao");

async function listExercises(req, res) {
  try {
    const exercises = await exerciseDao.list();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Failed to list exercises", error });
  }
}

module.exports = listExercises;
