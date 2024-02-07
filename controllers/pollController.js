const User = require("../models/userModel");
const Poll = require("../models/pollModel");

exports.getPolls = async (req, res, next) => {
  try {
    // console.log(req.user.id);

    // Find poll data if user created any poll before
    const pollInstances = await Poll.findAll({
      where: {
        userId: req.user.id,
      },
    });

    //console.log(pollInstances)
    if (pollInstances && pollInstances.length > 0) {
      return res.status(200).json({ polls: pollInstances, success: true });
    } else {
      return res.status(200).json({ polls: [], success: true });
    }
  } catch (error) {
    console.error("Error occurred during geting poll data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

exports.createPoll = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    if (!req.body.question) {
      return res.status(400).send({ message: "Send all required fields" });
    }

    // Created  poll
    const pollInsertData = await Poll.create({
      question: req.body.question,
      userId: req.user.id,
    });
    console.log(pollInsertData);
    if (pollInsertData) {
      return res
        .status(200)
        .json({
          data: pollInsertData,
          message: "Poll created succesully",
          success: true,
        });
    }
  } catch (error) {
    console.error("Error occurred during creating poll data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
