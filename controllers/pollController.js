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
      return res.status(200).json({
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

exports.getPollById = async (req, res, next) => {
  try {
    const pollId = req.query.pollId;
    //console.log(pollId);
    const pollInstance = await Poll.findAll({
      where: {
        id: pollId,
      },
    });

    //console.log(pollInstances)
    if (pollInstance && pollInstance.length > 0) {
      return res.status(200).json({ poll: pollInstance, success: true });
    }
  } catch (error) {
    console.error("Error occurred during geting poll data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

exports.editPoll = async (req, res, next) => {
  try {
    console.log(req.body);

    const pollId = req.body.id;
    const question = req.body.question;

    const updatePolldata = await Poll.update(
      { question: question },
      {
        where: {
          id: pollId,
        },
      }
    );

    console.log(updatePolldata);
    if (updatePolldata) {
      return res.status(200).json({
        poll: updatePolldata,
        message: "Poll data updated succesfully",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error occurred during geting poll data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

exports.deletePoll = async (req, res, next) => {
  try {
    console.log(req.body.pollId);
    const deletePollData = await Poll.destroy({
      where: {
        id: req.body.pollId,
      },
    });
    if (deletePollData) {
      return res.status(200).json({
        poll: deletePollData,
        message: "Poll data deleted succesfully",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error occurred deleting poll data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
