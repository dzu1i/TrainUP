const examDao = require("../../dao/exam-dao");
const { ObjectId } = require("mongodb");

async function editExam(req, res) {
  try {
    const { id, name, description, exerciseIds } = req.body;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Missing or invalid exam ID" });
    }

    const existingExam = await examDao.get(id);
    if (!existingExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const updateData = {
      name: name ?? existingExam.name,
      description: description ?? existingExam.description,
      exerciseIds: Array.isArray(exerciseIds)
        ? exerciseIds.map(eid => new ObjectId(eid))
        : existingExam.exerciseIds ?? []
    };

    const updated = await examDao.edit(id, updateData);

    if (!updated) {
      return res.status(500).json({ message: "Failed to update exam" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Failed to edit exam:", error);
    res.status(500).json({ message: "Failed to edit exam", error });
  }
}

module.exports = editExam;
