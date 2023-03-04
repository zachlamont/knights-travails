const knightMoves = (start, target) => {
  // Define the possible moves for a knight
  const moves = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
  ];

  // Define a function to check if a square is within the bounds of the chessboard
  const isWithinBounds = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;

  // Define a queue to keep track of the squares to visit
  const queue = [[start]];

  // Define a set to keep track of the squares we have already visited
  const visited = new Set([start.toString()]);

  // Loop through the queue until we find the target square
  while (queue.length > 0) {
    // Get the next square to visit from the queue
    const path = queue.shift();
    const square = path[path.length - 1];

    // Check if we have reached the target square
    if (square.toString() === target.toString()) {
      return path;
    }

    // Generate the next possible moves from the current square
    for (const move of moves) {
      const nextSquare = [square[0] + move[0], square[1] + move[1]];

      // Check if the next square is within bounds and hasn't already been visited
      if (isWithinBounds(nextSquare) && !visited.has(nextSquare.toString())) {
        // Add the next square to the queue and mark it as visited
        queue.push([...path, nextSquare]);
        visited.add(nextSquare.toString());
      }
    }
  }

  // If we didn't find the target square, return null
  return null;
};

export default knightMoves;

// Test the function with some example inputs
console.log(knightMoves([0, 0], [3, 3])); // Expected output: [[0, 0], [1, 2], [3, 3]]
console.log(knightMoves([0, 0], [7, 7])); // Expected output: [[0, 0], [1, 2], [0, 4], [1, 6], [2, 4], [4, 5], [6, 6], [7, 7]]
console.log(knightMoves([0, 0], [8, 8])); // Expected output: null
