const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./util/database");
const cors = require("cors");

const pollController = require("./controllers/pollController");

const app = express();
app.use(express.json());
app.use(cors());

// Socket initialization
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Model Import
const User = require("./models/userModel");
const Poll = require("./models/pollModel");
const Option = require("./models/optionModel");
const Vote = require("./models/voteModel");

// Route Import
const userRoute = require("./routes/userRoute");
const pollRoute = require("./routes/pollRoute");
const optionRoute = require("./routes/optionRoute");
const voteRoute = require("./routes/voteRoute");

app.use("/api/user", userRoute);
app.use("/api/poll", pollRoute);
app.use("/api/option", optionRoute);
app.use("/api/vote", voteRoute);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `./public/${req.url}`));
});

// Database relation
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

// Socket Code Start

//Handle Connection
io.on("connection", (socket) => {
  console.log(`Server connected with id:${socket.id}`);
  // socket.emit("testMessage", "Hello from the server!");

  // Handle getActivePolls event
  socket.on("getActivePolls", async () => {
    try {
      //Implement logic for fetching active polls
      const activePolls = await Poll.findAll({ where: { status: true } });
      for (let poll of activePolls) {
        const options = await Option.findAll({ where: { pollId: poll.id } });
        poll.dataValues.options = options;
      }

      io.to(socket.id).emit("activePollsData", { data: activePolls });
    } catch (error) {
      console.error("Error occurred getting active poll data:", error);
      io.to(socket.id).emit("activePollsDataError", {
        message: "Internal server error",
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// Socket Code End

async function startServer() {
  try {
    await sequelize.sync();
    server.listen(process.env.PORT || 3000, () => {
      console.log("Server is running...");
    });
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}
startServer();
