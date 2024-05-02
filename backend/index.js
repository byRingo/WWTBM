const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const Questions = db.Questions;
const Leaderboard = db.Leaderboard;
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:5173" }));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/api/v1/question", (req, res) => {
  Questions.findAll({
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    where: { difficulty: req.query.level },
  }).then((resp) => {
    let index = getRndInteger(0, resp.length);
    res.json(resp[index]);
  });
});

app.get("/api/v1/leaderboard", (req, res) => {
  Leaderboard.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  }).then((resp) => {
    res.json(resp);
  });
});

app.post("/api/v1/leaderboard", (req, res) => {
  let lastIndex;
  Leaderboard.findOne({
    order: [["id", "DESC"]],
  })
    .then((r) => (lastIndex = r.id))
    .then(() => {
      Leaderboard.create({
        id: lastIndex + 1,
        user_name: req.body.user_name,
        user_amount: req.body.user_amount,
        used_hints_quantity: req.body.used_hints_quantity,
      });
    });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
