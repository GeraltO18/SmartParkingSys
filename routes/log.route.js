const express = require("express");
const router = express.Router();
const logController = require("../controller/log.controller");

router
  .route("/checkin")
  .post(logController.createCheckIn);

module.exports = router;
