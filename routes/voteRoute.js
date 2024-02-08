const express = require("express");

const voteController = require("../controllers/voteController");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/create_vote", auth.authenticate, voteController.createVote);

module.exports = router;
