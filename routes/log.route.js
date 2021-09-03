const express = require("express");
const router = express.Router();
const logController = require("../controller/log.controller");

router.route("/checkin").post(logController.createCheckIn);

router.route("/createSlot").post(logController.createSlot);
router.route("/createUser").post(logController.createUser);

module.exports = router;
