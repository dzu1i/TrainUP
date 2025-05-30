const examDao = require("../../dao/exam-dao");
const exerciseDao = require("../../dao/exercise-dao");
const { ObjectId } = require("mongodb");

async function listExam(req, res) {
  try {
    const exams = await examDao.list();

    const result = await Promise.all(
      exams.map(async (exam) => {
        const exerciseIds = exam.exerciseIds ?? [];
        const exercises = await Promise.all(
          exerciseIds.map(id => exerciseDao.get(id))
        );

        const total = exercises.length;
        const completed = exercises.filter(e => e?.status === "completed").length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
          _id: exam._id,
          name: exam.name,
          description: exam.description,
          exercises: exerciseIds,
          progress
        };
      })
    );

    res.json(result);
  } catch (error) {
    console.error("Failed to list exams:", error);
    res.status(500).json({ message: "Failed to list exams", error });
  }
}

module.exports = listExam;
