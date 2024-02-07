const express = require("express");

const pollController = require("../controllers/pollController");

const auth = require("../middleware/auth");
const router = express.Router();

router.get("/get_polls", auth.authenticate, pollController.getPolls);
router.post("/create_poll", auth.authenticate, pollController.createPoll);
router.get("/get_poll_by_id", auth.authenticate, pollController.getPollById);

module.exports = router;
