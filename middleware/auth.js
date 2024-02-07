const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token is missing" });
    }

    const user = jwt.verify(token, process.env.JSONTOKEN_SECRET);
    // console.log(user);
    if (!user.userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const foundUser = await User.findByPk(user.userId);
    if (!foundUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = {
  authenticate,
};
