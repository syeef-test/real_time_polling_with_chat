const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Polls = sequelize.define("polls", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  active_time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  countVote: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
});

module.exports = Polls;
