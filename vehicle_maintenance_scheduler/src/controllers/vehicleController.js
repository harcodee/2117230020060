const Log = require("../config/logger");

const {
  fetchDepots,
  fetchVehicles,
} = require("../services/apiService");

const processSchedules =
  require("../services/schedulerService");

async function getSchedules(req, res) {

  try {

    await Log(
      "backend",
      "info",
      "controller",
      "Vehicle scheduling started"
    );

    const depots = await fetchDepots();

    const vehicles = await fetchVehicles();

    const result = processSchedules(
      depots,
      vehicles
    );

    await Log(
      "backend",
      "info",
      "controller",
      "Vehicle scheduling completed"
    );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    await Log(
      "backend",
      "error",
      "handler",
      error.message
    );

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getSchedules,
};
