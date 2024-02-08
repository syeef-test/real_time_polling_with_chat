const express = require("express");

const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./util/database");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

//Model Import
const User = require("./models/userModel");
const Poll = require("./models/pollModel");
const Option = require("./models/optionModel");
const Vote = require("./models/voteModel");

//Route Import
const userRoute = require("./routes/userRoute");
const pollRoute = require("./routes/pollRoute");
const optionRoute = require("./routes/optionRoute");
const voteRoute = require("./routes/voteRoute");

app.use("/api/user", userRoute);
app.use("/api/poll", pollRoute);
app.use("/api/option", optionRoute);
app.use("/api/vote", voteRoute);

app.use((req, res) => {
  //console.log(req.url);
  res.sendFile(path.join(__dirname, `./public/${req.url}`));
});

//Database relation
User.hasMany(Poll);
Poll.belongsTo(User);

Poll.hasMany(Option);
Option.belongsTo(Poll);

User.hasMany(Option);
Option.belongsTo(User);

User.hasMany(Vote);
Vote.belongsTo(User);
Poll.hasMany(Vote);
Vote.belongsTo(Poll);
Option.hasMany(Vote);
Vote.belongsTo(Option);

async function startServer() {
  try {
    await sequelize.sync();
    //await sequelize.sync({force:true});
    app.listen(process.env.PORT || 3000);
    console.log("Server is running...");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}
startServer();
