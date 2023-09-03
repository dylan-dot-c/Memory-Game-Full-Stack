const users = require("../models");

const addNewUser = async (req, res) => {
  const { username } = req.body;

  try {
    const data = await users.create({
      username: username,
    });

    res.status(201).json({
      msg: "New user added",
      count: 1,
    });
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

module.exports = {
  addNewUser,
};
