const optimizeSchedule = require("../utils/knapsack");

function processSchedules(depots, vehicles) {

  const results = [];

  for (const depot of depots) {

    const optimized = optimizeSchedule(
      vehicles,
      depot.MechanicHours
    );

    results.push({
      depotID: depot.ID,
      mechanicHours: depot.MechanicHours,
      totalImpact: optimized.maxImpact,
      selectedTasks: optimized.selectedTasks,
    });
  }

  return results;
}

module.exports = processSchedules;
