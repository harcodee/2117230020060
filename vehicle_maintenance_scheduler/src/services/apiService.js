const axios = require("axios");

const Log = require("../config/logger");

const DEPOT_API =
  "http://20.207.122.201/evaluation-service/depots";

const VEHICLE_API =
  "http://20.207.122.201/evaluation-service/vehicles";

const headers = {
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
};

async function fetchDepots() {

  try {

    await Log(
      "backend",
      "info",
      "service",
      "Fetching depot data"
    );

    const response = await axios.get(
      DEPOT_API,
      { headers }
    );

    return response.data.depots;

  } catch (error) {

    await Log(
      "backend",
      "error",
      "service",
      `Depot API failed: ${error.message}`
    );

    throw error;
  }
}

async function fetchVehicles() {

  try {

    await Log(
      "backend",
      "info",
      "service",
      "Fetching vehicle data"
    );

    const response = await axios.get(
      VEHICLE_API,
      { headers }
    );

    return response.data.vehicles;

  } catch (error) {

    await Log(
      "backend",
      "error",
      "service",
      `Vehicle API failed: ${error.message}`
    );

    throw error;
  }
}

module.exports = {
  fetchDepots,
  fetchVehicles,
};
