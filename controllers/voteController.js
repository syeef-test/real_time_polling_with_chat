const User = require("../models/userModel");
const Poll = require("../models/pollModel");
const Option = require("../models/optionModel");
const Vote = require("../models/voteModel");

exports.createVote = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    // console.log("Create Vote Called");
    // console.log(req.body);
    const pollId = req.body.pollId;
    const optionId = req.body.optionId;

    const prevData = Vote.findAll({
      where: {
        userId: req.user.id,
        pollId: pollId,
      },
    });

    if (prevData) {
      return res.status(200).json({
        message: "Allready voted on this poll please try another poll",
        success: true,
      });
    } else {
      const voteInsertData = await Vote.create({
        pollId: pollId,
        optionId: optionId,
        userId: req.user.id,
      });
      if (voteInsertData) {
        return res.status(200).json({
          data: voteInsertData,
          message: "Vote added succesully",
          success: true,
        });
      }
    }
  } catch (error) {
    console.error("Error occurred during geting option data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
