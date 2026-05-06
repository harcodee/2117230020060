const Log = require("../config/logger");
const { fetchNotifications } = require("../services/notificationService");
const { rankNotifications } = require("../services/priorityService");

async function getPriorityNotifications(req, res) {
  try {
    await Log("backend", "info", "controller", "Log route access");

    const notifications = await fetchNotifications();
    const ranked = await rankNotifications(notifications);

    res.status(200).json({
      success: true,
      count: ranked.length,
      data: ranked,
    });
  } catch (error) {
    await Log("backend", "error", "controller", `Log errors: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = { getPriorityNotifications };
