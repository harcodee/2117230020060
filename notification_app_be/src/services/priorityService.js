const Log = require("../config/logger");
const { calculatePriority } = require("../utils/scoring");
const { getTopN } = require("../utils/heap");

async function rankNotifications(notifications) {
  await Log("backend", "info", "service", "Log ranking process");

  const scored = notifications.map((notif) => {
    return {
      ...notif,
      score: calculatePriority(notif),
    };
  });

  const top10 = getTopN(scored, 10);

  await Log("backend", "info", "service", "Log scoring completion");
  return top10;
}

module.exports = { rankNotifications };
