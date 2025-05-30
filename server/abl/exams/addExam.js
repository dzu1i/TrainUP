const examDao = require("../../dao/exam-dao");
const exerciseDao = require("../../dao/exercise-dao");
const { ObjectId } = require("mongodb");

async function addExam(req, res) {
  try {
    const { name, description, exerciseIds } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Missing required field: name" });
    }

    const exam = {
      name,
      description: description ?? "",
      exerciseIds: (exerciseIds ?? []).map(id => new ObjectId(id))
    };

    const createdExam = await examDao.create(exam);

    if (exerciseIds && exerciseIds.length > 0) {
      for (const exId of exerciseIds) {
        const exercise = await exerciseDao.get(exId);
        if (exercise) {
          const currentExamIds = Array.isArray(exercise.examIds)
            ? exercise.examIds.map(id => id.toString())
            : [];

          if (!currentExamIds.includes(createdExam._id.toString())) {
            const updatedExamIds = [...currentExamIds, createdExam._id.toString()];
            await exerciseDao.edit({
              id: exId,
              examIds: updatedExamIds
            });
          }
        }
      }
    }

    res.status(201).json(createdExam);
  } catch (error) {
    console.error("Failed to create exam:", error);
    res.status(500).json({ message: "Failed to create exam", error });
  }
}

module.exports = addExam;
