const axios = require("axios");
const Log = require("../config/logger");
const { NOTIFICATIONS_API } = require("../config/apiConfig");

async function fetchNotifications() {
  await Log("backend", "info", "service", "Log API fetch start");

  try {
    const response = await axios.get(NOTIFICATIONS_API, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    await Log("backend", "info", "service", "Log API fetch success");
    return response.data.notifications || [];
  } catch (error) {
    await Log("backend", "error", "service", `Log errors: ${error.message}`);
    throw error;
  }
}

module.exports = { fetchNotifications };
