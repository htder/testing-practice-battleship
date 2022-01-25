const Ship = function Ship(length) {
  const ship = {};

  ship.positions = [];
  (function fillShipPositions() {
    for (let i = 0; i < length; i += 1) {
      ship.positions[i] = 0;
    }
  })();

  ship.getLength = function getLength() {
    return ship.positions.length;
  };

  ship.hit = function hit() {
    let index = 0;
    ship.positions[index] = 1;
    index += 1;
    return ship.positions;
  };

  ship.isSunk = function isSunk() {
    const sum = ship.positions.reduce((prev, total) => prev + total, 0);
    return sum === ship.positions.length;
  };

  return ship;
};

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
        return 'Winner';
      }
    } else {
      missedHits.push([x, y]);
    }
    return 'keep playing';
  };

  gameBoard.getBoard = function gameBoard() {
    return gameArray;
  };

  gameBoard.getMisses = function getMisses() {
    return missedHits;
  };

  return gameBoard;
};

export { Ship, GameBoard };
