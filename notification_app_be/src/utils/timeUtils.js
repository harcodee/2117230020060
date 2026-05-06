function calculateRecencyWeight(timestampStr) {
  const notificationTime = new Date(timestampStr).getTime();
  const currentTime = new Date().getTime();
  const diffHours = (currentTime - notificationTime) / (1000 * 60 * 60);

  // Score decreases as diffHours increases. 100 for immediate, decaying as hours go by.
  const recencyScore = 100 / (1 + Math.max(0, diffHours));
  return recencyScore;
}

module.exports = { calculateRecencyWeight };
