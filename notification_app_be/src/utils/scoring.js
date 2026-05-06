const { calculateRecencyWeight } = require('./timeUtils');

function calculatePriority(notification) {
  let baseScore = 0;

  switch (notification.Type) {
    case 'Placement':
      baseScore = 30;
      break;
    case 'Result':
      baseScore = 20;
      break;
    case 'Event':
      baseScore = 10;
      break;
    default:
      baseScore = 0;
  }

  const recencyScore = calculateRecencyWeight(notification.Timestamp);

  // Combine static priority weight with dynamic recency weight
  return baseScore + recencyScore;
}

module.exports = { calculatePriority };
