const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Options = sequelize.define("options", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  option_text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Options;
