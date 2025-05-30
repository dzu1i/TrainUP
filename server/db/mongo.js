const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://julievitkova:julievitkova@cluster0.euxo6eb.mongodb.net/?retryWrites=true&w=majority";

let client;

async function connectToDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("TrainUP");
}

module.exports = connectToDb;
