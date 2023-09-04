const { users } = require("../models");

const addNewUser = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  try {
    const data = await users.create({
      username: username,
    });

    res.status(201).json({
      msg: "New user added",
      count: 1,
      id: data.id,
    });
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

module.exports = {
  addNewUser,
};
