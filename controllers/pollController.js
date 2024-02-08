const User = require("../models/userModel");
const Poll = require("../models/pollModel");
const Option = require("../models/optionModel");

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
      active_time: req.body.active_time,
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
    const active_time = req.body.active_time;

    const updatePolldata = await Poll.update(
      { question: question, active_time: active_time },
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
    const oldStatus = await Poll.findOne({
      where: {
        id: req.body.pollId,
      },
    });

    console.log(oldStatus.status);
    const newStatus = !oldStatus.status;
    const updatePollData = await Poll.update(
      { status: newStatus },
      {
        where: {
          id: req.body.pollId,
        },
      }
    );
    if (updatePollData) {
      return res.status(200).json({
        poll: updatePollData,
        message: "Poll data updated succesfully",
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

// exports.getActivePolls = async (req, res, next) => {
//   try {
//     // console.log("Get active polls");

//     const activePolls = await Poll.findAll({ where: { status: true } });
//     //console.log(activePolls);

//     for (let poll of activePolls) {
//       const options = await Option.findAll({ where: { pollId: poll.id } });
//       poll.dataValues.options = options;
//     }

//     //console.log(activePolls);

//     return res.status(200).json({ data: activePolls, success: true });
//   } catch (error) {
//     console.error("Error occurred deleting poll data:", error);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", success: false });
//   }
// };
