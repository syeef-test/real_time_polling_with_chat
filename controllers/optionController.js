const User = require("../models/userModel");
const Poll = require("../models/pollModel");
const Option = require("../models/optionModel");

exports.getOptionByPollIdUserId = async (req, res, next) => {
  try {
    // console.log(req.user.id);

    const pollCreatedByUser = await Poll.findAll({
      where: {
        userId: req.user.id,
        status: true,
      },
    });

    //console.log("Pollcreatedbyuser_active:", pollCreatedByUser);

    if (pollCreatedByUser && pollCreatedByUser.length > 0) {
      return res.status(200).json({ polls: pollCreatedByUser, success: true });
    } else {
      return res.status(200).json({ polls: [], success: true });
    }
  } catch (error) {
    console.error("Error occurred during geting option data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

exports.createOption = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    console.log(req.body);
    const poll_question_id = req.body.poll_question;
    const option = req.body.option;

    const optionInsertData = await Option.create({
      option_text: option,
      pollId: poll_question_id,
      userId: req.user.id,
    });
    if (optionInsertData) {
      return res.status(200).json({
        data: optionInsertData,
        message: "Option created succesully",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error occurred during geting option data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

exports.getOptions = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    const optionData = await Option.findAll({
      where: {
        userId: req.user.id,
      },
    });
    //console.log(optionData);

    if (optionData && optionData.length > 0) {
      return res.status(200).json({ options: optionData, success: true });
    } else {
      return res.status(200).json({ options: [], success: true });
    }
  } catch (error) {
    console.error("Error occurred during geting option data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

exports.deleteOptionById = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    const optionDeleteData = await Option.destroy({
      where: {
        userId: req.user.id,
      },
    });
    //console.log(optionDeleteData);

    if (optionDeleteData) {
      return res
        .status(200)
        .json({ message: "Option data deleted succesfully", success: true });
    }
  } catch (error) {
    console.error("Error occurred during deleting option data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
