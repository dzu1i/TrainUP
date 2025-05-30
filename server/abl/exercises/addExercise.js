const exerciseDao = require("../../dao/exercise-dao");

async function addExercise(req, res) {
  try {
    const { name, description, status } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Missing required field: name",
      });
    }

    const allowedStatuses = ["not started", "in progress", "completed"];
    const finalStatus = status || "not started";

    if (!allowedStatuses.includes(finalStatus)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const newExercise = await exerciseDao.create({
      name,
      description: description || "",
      status: finalStatus,
    });

    res.json(newExercise);
  } catch (error) {
    console.error("Failed to create exercise:", error);
    res.status(500).json({ message: "Failed to create exercise", error });
  }
}

module.exports = addExercise;
