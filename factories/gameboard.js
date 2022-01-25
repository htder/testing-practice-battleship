const GameBoard = function GameBoard() {
  const gameBoard = {};
  const missedHits = [];
  const gameArray = [];

  const fillGameArray = function fillGameArray() {
    for (let i = 0; i < 10; i += 1) {
      gameArray[i] = [];
      for (let j = 0; j < 10; j += 1) {
        gameArray[i][j] = {};
      }
    }
  };
  fillGameArray();

  gameBoard.placeShip = function placeShip(x, y, alignment, ship) {
    for (let i = 0; i < ship.getLength(); i += 1) {
      if (alignment === 'h') {
        gameArray[x][y + i].ship = ship;
      } else if (alignment === 'v') {
        gameArray[x + i][y].ship = ship;
      }
    }
  };

  function allShipsSunk() {
    let count = 0;
    gameBoard.forEach((square) => {
      if (square.ship.isSunk) {
        count += 1;
      }
    });
    return count === 17;
  }

  gameBoard.receiveAttack = function receiveAttack(x, y) {
    if (gameArray[x][y].ship) {
      gameArray[x][y].ship.hit();
      if (allShipsSunk) {
        return true;
      }
    } else {
      missedHits.push([x, y]);
    }
    return false;
  };

  gameBoard.getBoard = function getBoard() {
    return gameArray;
  };

  gameBoard.getMisses = function getMisses() {
    return missedHits;
  };

  return gameBoard;
};

export default GameBoard;
