const exerciseDao = require("../../dao/exercise-dao");

async function trackExercise(req, res) {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        message: "Missing required fields: id or status",
      });
    }

    const allowedStatuses = ["not started", "in progress", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const updatedExercise = await exerciseDao.updateStatus(id, status);
    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(updatedExercise);
  } catch (error) {
    console.error("Failed to update exercise:", error);
    res.status(500).json({ message: "Failed to update exercise", error });
  }
}

module.exports = trackExercise;
