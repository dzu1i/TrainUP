const exerciseDao = require("../../dao/exercise-dao");
const { ObjectId } = require("mongodb");

async function editExercise(req, res) {
  try {
    const { id, name, description, status} = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing required field: id" });
    }

    const allowedStatuses = ["not started", "in progress", "completed"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const existing = await exerciseDao.get(id);
    if (!existing) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    const updatedExercise = {
      ...existing,
      name: name ?? existing.name,
      description: description ?? existing.description,
      status: status ?? existing.status
    };

    const result = await exerciseDao.edit(updatedExercise);
    res.json(result);
  } catch (error) {
    console.error("Failed to edit exercise:", error);
    res.status(500).json({ message: "Failed to edit exercise", error });
  }
}

module.exports = editExercise;
