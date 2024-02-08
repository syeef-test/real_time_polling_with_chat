const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Votes = sequelize.define("votes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  countVote: {
    type: Sequelize.NUMBER,
    allowNull: true,
  },
});

module.exports = Votes;
