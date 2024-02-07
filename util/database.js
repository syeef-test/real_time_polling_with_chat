const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { dialect: "mysql", host: "127.0.0.1" }
);

module.exports = sequelize;
