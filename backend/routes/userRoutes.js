const express = require("express");
const { addNewUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/add", addNewUser);

module.exports = userRouter;
