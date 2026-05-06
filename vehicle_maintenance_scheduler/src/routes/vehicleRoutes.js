const express = require("express");

const router = express.Router();

const {
  getSchedules,
} = require("../controllers/vehicleController");

router.get("/schedule", getSchedules);

module.exports = router;
