require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "meatloaf",
    database: "memory_game",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.USER,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_HOST,
    dialect: process.env.PROD_DIALECT,
    port: process.env.PROD_PORT,
  },
};
