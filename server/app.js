const express = require("express");
const app = express();
const port = 3001;

const connectToDb = require("./db/mongo");

const examsController = require("./controller/exams");
const exercisesController = require("./controller/exercises");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/exams", examsController);
app.use("/exercises", exercisesController);

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
