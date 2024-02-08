const express = require("express");

const pollController = require("../controllers/pollController");

const auth = require("../middleware/auth");
const router = express.Router();

router.get("/get_polls", auth.authenticate, pollController.getPolls);
router.post("/create_poll", auth.authenticate, pollController.createPoll);
router.get("/get_poll_by_id", auth.authenticate, pollController.getPollById);
router.post("/edit_poll", auth.authenticate, pollController.editPoll);
router.post("/delete_poll_by_id", auth.authenticate, pollController.deletePoll);

// router.get(
//   "/get_active_polls",
//   auth.authenticate,
//   pollController.getActivePolls
// );

module.exports = router;
