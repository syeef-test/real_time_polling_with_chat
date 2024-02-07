const express = require("express");

const userController = require("../controllers/userController");

const router = express.router();

router.post("/signup", userController.postSignup);

module.exports = router;
