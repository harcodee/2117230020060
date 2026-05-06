// Keeping it simple for now with a basic sort.
// TODO: Implement an actual Min-Heap or Max-Heap if the array gets too large.
function getTopN(items, n) {
  return items.sort((a, b) => b.score - a.score).slice(0, n);
}

module.exports = { getTopN };
