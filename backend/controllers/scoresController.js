const { scores, users } = require("../models");
const { Op } = require("sequelize");

const addNewScore = async (req, res) => {
  const { id, flips, seconds, difficulty } = req.body;

  const user = await users.findByPk(id);

  if (!user) {
    res.status(404).json({ msg: "User dont exist!!" });
    return;
  }

  try {
    const data = await user.createScore({
      flips,
      seconds,
      difficulty,
    });
    res.status(200).send({ msg: "New Score Added" });
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

const getAllScores = async (req, res) => {
  var { difficulty } = req.query;

  difficulty = difficulty || "";
  const whereClause = difficulty
    ? { difficulty: difficulty }
    : {
        difficulty: {
          [Op.or]: ["easy", "medium", "hard"],
        },
      };

  try {
    const data = await scores.findAll({
      where: whereClause,
      order: [
        ["flips", "ASC"],
        ["seconds", "ASC"],
      ],
      include: [
        {
          model: users,
          attributes: ["username"],
        },
      ],
      limit: 10,
    });

    res.status(200).json({ data });
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = { addNewScore, getAllScores };
