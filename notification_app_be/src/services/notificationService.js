const axios = require("axios");
const Log = require("../config/logger");
const { NOTIFICATIONS_API } = require("../config/apiConfig");

async function fetchNotifications() {
  await Log("backend", "info", "service", "Starting API fetch for notifications");

  try {
    const response = await axios.get(NOTIFICATIONS_API, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    await Log("backend", "info", "service", "API fetch successful");
    return response.data.notifications || [];
  } catch (error) {
    await Log("backend", "error", "service", `API fetch failed: ${error.message}`);
    throw error;
  }
}

module.exports = { fetchNotifications };
