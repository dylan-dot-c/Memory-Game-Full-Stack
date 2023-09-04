const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const db = require("./models");
const userRouter = require("./routes/userRoutes");
const scoreRouter = require("./routes/scoresRoutes");

const { users } = require("./models");
// userRoute.
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT;

db.sequelize.sync({ alter: true }).then((req) => {
  app.listen(port, () => {
    console.log("SERVER is UP on port", port);
  });
});

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to my API" });
});

app.use("/users", userRouter);
app.use("/scores", scoreRouter);
