const express = require("express");

const pollController = require("../controllers/pollController");

const auth = require("../middleware/auth");
const router = express.Router();

router.get("/get_polls", auth.authenticate, pollController.getPolls);

module.exports = router;
