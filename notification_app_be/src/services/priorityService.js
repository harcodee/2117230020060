const Log = require("../config/logger");
const { calculatePriority } = require("../utils/scoring");
const { getTopN } = require("../utils/heap");

async function rankNotifications(notifications) {
  await Log("backend", "info", "service", "Ranking process started");

  // Map each notification to include its calculated score
  const scored = notifications.map((notif) => ({
    ...notif,
    score: calculatePriority(notif),
  }));

  // Get top 10 highest priority notifications
  const top10 = getTopN(scored, 10);

  await Log("backend", "info", "service", "Scoring completed");
  return top10;
}

module.exports = { rankNotifications };
