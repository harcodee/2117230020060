function calculateRecencyWeight(timestampStr) {
  const notifTime = new Date(timestampStr).getTime();
  const now = new Date().getTime();
  const diffHours = (now - notifTime) / (1000 * 60 * 60);

  // Simple decay formula: score drops as diffHours increases
  return 100 / (1 + Math.max(0, diffHours));
}

module.exports = { calculateRecencyWeight };
