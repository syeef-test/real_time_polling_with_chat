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

    //Find if email allready exist
    const user = await User.findAll({
      attributes: ["email"],
      where: { email: req.body.email },
    });

    //If user allready exist with same email return appropriate message else create new user
    if (typeof user !== "undefined" && user.length > 0) {
      res.status(401).json({
        message: "User already exists, Please Login",
        success: false,
      });
    } else {
      //Hash the password for more security
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      if (hash) {
        const insertData = await User.create({
          name,
          email,
          password: hash,
          phone: phone,
        });
        //Return succesful message after user creation
        res.status(201).json({ message: "Sign Up Succesful", success: true });
      }
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};
