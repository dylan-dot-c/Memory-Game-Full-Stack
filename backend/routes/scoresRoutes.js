const express = require("express");
const {
  addNewScore,
  getAllScores,
} = require("../controllers/scoresController");

const scoreRouter = express.Router();

scoreRouter.post("/newScore", addNewScore);

scoreRouter.get("/all", getAllScores);

module.exports = scoreRouter;
