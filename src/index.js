//import knightMoves from './knightMoves.js';

// Get a reference to the chessboard element
const chessboard = document.getElementById("chessboard");

// Loop through each square on the chessboard and create a div element for it
for (let i = 0; i < 64; i++) {
  const square = document.createElement("div");

  // Set the class of the square to either 'white' or 'black' based on its position on the chessboard
  square.classList.add((Math.floor(i / 8) + i) % 2 === 0 ? "white" : "black");

  // Add an event listener for when the user clicks on the square
  square.addEventListener("click", () => {
    // Get the x and y coordinates of the clicked square
    const x = i % 8;
    const y = Math.floor(i / 8);

    // If the start square is not yet set, set it and populate the square with a knight symbol
    if (!startSquare) {
      startSquare = [x, y];
      square.textContent = "♞";
    }
    // If the start square is already set, set the target square and call the knightMoves function
    else {
      targetSquare = [x, y];
      const path = knightMoves(startSquare, targetSquare);
      // Loop through each square on the chessboard and remove any existing highlight
      for (const square of document.querySelectorAll(".highlight")) {
        square.classList.remove("highlight");
      }
      // If a path is found, highlight each square in the path
      if (path) {
        for (const [x, y] of path) {
          const squareIndex = y * 8 + x;
          chessboard.children[squareIndex].classList.add("highlight");
        }
      }
      // Reset the start square and target square variables
      startSquare = null;
      targetSquare = null;
    }
  });

  // Add the square to the chessboard
  chessboard.appendChild(square);
}

// Define variables to keep track of the start and target squares
let startSquare = null;
let targetSquare = null;

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

// export default knightMoves;

// Test the function with some example inputs
console.log(knightMoves([0, 0], [3, 3])); // Expected output: [[0, 0], [1, 2], [3, 3]]
console.log(knightMoves([0, 0], [7, 7])); // Expected output: [[0, 0], [1, 2], [0, 4], [1, 6], [2, 4], [4, 5], [6, 6], [7, 7]]
console.log(knightMoves([0, 0], [8, 8])); // Expected output: null
