const express = require("express");

const optionController = require("../controllers/optionController");

const auth = require("../middleware/auth");
const router = express.Router();

router.get(
  "/get_option_pollid_uersid",
  auth.authenticate,
  optionController.getOptionByPollIdUserId
);
router.post("/create_option", auth.authenticate, optionController.createOption);
router.get("/get_options", auth.authenticate, optionController.getOptions);
router.post(
  "/delete_option_by_id",
  auth.authenticate,
  optionController.deleteOptionById
);

module.exports = router;
