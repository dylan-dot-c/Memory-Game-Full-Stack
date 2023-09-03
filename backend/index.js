const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const db = require("./models");
const userRoute = require("./routes/userRoutes");

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

app.use("/users", userRoute.users);

app.post("/create", async (req, res) => {
  const { username } = req.body;

  try {
    const data = await users.create({
      username: username,
    });

    res.status(201).json({
      msg: "New user added",
    });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});
