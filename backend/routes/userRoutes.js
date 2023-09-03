const express = require("express");
const { addNewUser } = require("../controllers/userController");
const users = express.Router();

users.get("/all", addNewUser);

module.exports = {
  users,
};
