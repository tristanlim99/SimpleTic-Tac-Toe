let currentState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let flatBoardData = [].concat(...currentState);
let historyState = [];
let turn = 0;
let board = document.querySelector("#game-board");
let wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let isWinner = () => {
  // Check if there's a winning combo
  let isWinner = wins.filter(function (win) {
    return (
      currentState[win[0]] &&
      currentState[win[0]] === currentState[win[1]] &&
      currentState[win[0]] === currentState[win[2]]
    );
  });

  if (isWinner.length > 0) {
    return currentState[isWinner[0][0]];
  }
};

let isFirstInRow = (id) => {
  return (id + 1) % 3 === 1;
};

let isLastInRow = (id) => {
  return (id + 1) % 3 === 0;
};

let buildSquares = (state, winner) => {
  // Setup rows
  let rows = "";

  // Loop through each square in the state
  state.forEach(function (square, id) {
    // Variables
    let value = square ? square : "";
    let selected = square ? ' aria-pressed="true"' : "";
    let disabled = square || winner ? " disabled" : false;

    // Check if it's a new row
    if (isFirstInRow(id)) {
      rows += "<tr>";
    }
    rows +=
      '<td><button class="game-square" data-id="' +
      id +
      '"' +
      selected +
      disabled +
      ">" +
      value +
      "</button></td>";

    // Check if it's the last column in a row
    if (isLastInRow(id)) {
      rows += "</tr>";
    }
  });

  return rows;
};

let buildHistory = () => {
  // Setup history markup
  let history = "";

  if (historyState.length > 0) {
    history += "<h2>Game History</h2><ol>";
    historyState.forEach(function (move, index) {
      history +=
        '<li><button data-history="' +
        move.toString() +
        '">Go to move # ' +
        (index + 1) +
        "</button></li>";
    });
    history += "</ol>";
  }
  return history;
};

let buildBoard = (state) => {
  // Check if there's a winner
  let winner = isWinner();

  let rows = winner ? "<h3> " + winner + " has won the game!<h3>" : "";
  rows += "<table><tbody>";

  // Create each square
  rows += buildSquares(state, winner);
  rows +=
    '</tbody></table><p><button id="play-again" class="play-again">Restart</button></p>';

  // Create game history
  rows += buildHistory();

  return rows;
};

let updateBoard = (state) => {
  if (!board) return;
  board.innerHTML = buildBoard(state || currentState);
};

let renderTurn = (square) => {
  // Get selected value
  let selected = square.getAttribute("data-id");
  if (!selected) return;

  // Update state
  currentState[selected] = turn;

  // Add a historical state
  historyState.push(currentState.slice());

  // Render with new state
  updateBoard();

  // Update turn
  turn = turn === "X" ? "O" : "X";
};

let resetBoard = () => {
  currentState = flatBoardData.fill(null);
  historyState = [];
  turn = "X";
  updateBoard();
};

resetBoard();

// Listen for selections
document.addEventListener(
  "click",
  function (event) {
    // If a .game-square was clicked
    if (
      event.target.matches(".game-square") &&
      !event.target.hasAttribute("disabled")
    ) {
      renderTurn(event.target);
    }

    // If #play-again was clicked
    if (event.target.matches("#play-again")) {
      resetBoard();
    }

    // If a historical button was clicked
    if (event.target.matches("[data-history]")) {
      updateBoard(event.target.getAttribute("data-history").split(","));
    }
  },
  false
);

let checkForTie = () => {
  let moves = 0;
  moves++;
  if (moves == 9) {
    console.log("draw");
  }
};
checkForTie;
