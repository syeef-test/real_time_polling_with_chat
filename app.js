const express = require("express");

const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./util/database");

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  //console.log(req.url);
  res.sendFile(path.join(__dirname, `./public/${req.url}`));
});

// app.listen(PORT, () => {
//   console.log(`Server is runing on ${PORT}`);
// });

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
