const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");

//Woork on local pc
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   { dialect: "mysql", host: "127.0.0.1" }
// );

//Work on remote
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
  }
);

module.exports = sequelize;
