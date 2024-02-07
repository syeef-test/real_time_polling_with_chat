const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res, next) => {
  try {
    //Validate input
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.phone
    ) {
      return res.status(400).send({ message: "Send all required fields" });
    }

    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    };

    // Find if email already exists
    const user = await User.findAll({
      attributes: ["email"],
      where: { email: req.body.email },
    });

    // If user already exists with the same email, return an appropriate message else, create a new user
    if (user && user.length > 0) {
      return res.status(401).json({
        message: "User already exists, Please Login",
        success: false,
      });
    } else {
      // Hash the password for more security
      const saltRounds = 10;
      const hash = await bcrypt.hash(newUserData.password, saltRounds);
      if (hash) {
        const insertData = await User.create({
          name: newUserData.name,
          email: newUserData.email,
          password: hash,
          phone: newUserData.phone,
        });
        // Return a successful message after user creation
        return res
          .status(201)
          .json({ message: "Sign Up Successful", success: true });
      }
    }
  } catch (error) {
    console.error("Error occurred during signup:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
