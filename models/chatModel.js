const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Chats = sequelize.define("chats", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message_text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Chats;
