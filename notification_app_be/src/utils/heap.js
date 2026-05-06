// Utility to get the top N items from an array based on a score property
// Acts as a heap extraction conceptually
function getTopN(items, n) {
  return items.sort((a, b) => b.score - a.score).slice(0, n);
}

module.exports = { getTopN };
