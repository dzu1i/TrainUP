const connectToDb = require("../db/mongo");
const { ObjectId } = require("mongodb");

const COLLECTION = "exercises";

async function create(exercise) {
  const dbInstance = await connectToDb();
  const result = await dbInstance.collection(COLLECTION).insertOne({
    ...exercise
  });
  return { _id: result.insertedId, ...exercise };
}

async function get(id) {
  const dbInstance = await connectToDb();
  return dbInstance.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function list() {
  const dbInstance = await connectToDb();
  return dbInstance.collection(COLLECTION).find({}).toArray();
}

async function edit(exercise) {
  const dbInstance = await connectToDb();
  const { _id, id, ...rest } = exercise;
  const realId = _id ?? id;
  await dbInstance
    .collection(COLLECTION)
    .updateOne({ _id: new ObjectId(realId) }, { $set: rest });
  return get(realId);
}

async function remove(id) {
  const dbInstance = await connectToDb();
  await dbInstance.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

async function updateStatus(id, status) {
  const dbInstance = await connectToDb();
  await dbInstance
    .collection(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return get(id);
}

module.exports = {
  create,
  get,
  list,
  edit,
  remove,
  updateStatus
};
