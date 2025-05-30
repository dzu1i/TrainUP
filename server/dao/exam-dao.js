const { ObjectId } = require("mongodb");
const connectToDb = require("../db/mongo");

const COLLECTION = "exams";

async function create(exam) {
  const db = await connectToDb();
  const result = await db.collection("exams").insertOne(exam);
  return { ...exam, _id: result.insertedId };
}

async function get(id) {
  const db = await connectToDb();
  return await db.collection("exams").findOne({ _id: new ObjectId(id) });
}

async function list() {
  const db = await connectToDb();
  return await db.collection("exams").find({}).toArray();
}

async function edit(id, updateData) {
  const db = await connectToDb();
  updateData.exerciseIds = (updateData.exerciseIds ?? []).map(id => new ObjectId(id));

  await db.collection("exams").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  return await db.collection("exams").findOne({ _id: new ObjectId(id) });
}

module.exports = {
  create,
  get,
  list,
  edit
};
