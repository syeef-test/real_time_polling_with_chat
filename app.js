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

//Route Import
const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);

app.use((req, res) => {
  //console.log(req.url);
  res.sendFile(path.join(__dirname, `./public/${req.url}`));
});

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
