const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Votes = sequelize.define("votes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Votes;
