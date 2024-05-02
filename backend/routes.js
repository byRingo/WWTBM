const { Router } = require("express");
const db = require("./db");
const Questions = db.Questions;
const Leaderboard = db.Leaderboard;

const router = Router();

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get("/", (req, res) => {
  Questions.findAll({
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    where: { difficulty: req.query.level },
  }).then((resp) => {
    let index = getRndInteger(0, resp.length);
    res.json(resp[index]);
  });
});

router.get("/leaderboard", (req, res) => {
  Leaderboard.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  }).then((resp) => {
    console.log(resp);
    res.json(resp);
  });
});

module.exports = router;
