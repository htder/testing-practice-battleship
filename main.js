const Ship = function Ship(length) {
  const ship = {};
  let nextPosition = 0;

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
    ship.positions[nextPosition] = 1;
    nextPosition += 1;
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

const Player = function Player() {
  const player = {};
  const alreadyHit = [];

  function isAlreadyHit(x, y) {
    for (let i = 0; i < alreadyHit.length; i += 1) {
      if (alreadyHit[i][0] === x && alreadyHit[i][1] === y) return true;
    }
    return false;
  }

  player.attack = function attack(x, y, gameboard) {
    if (isAlreadyHit(x, y)) return;
    alreadyHit.push([x, y]);
    gameboard.receiveAttack(x, y);
  };

  player.randomAttack = function randomAttack(gameboard) {
    if (alreadyHit.length === 100) return;

    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (isAlreadyHit(x, y)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    this.alreadyHit.push([x, y]);
    gameboard.receiveAttack(x, y);
  };

  return player;
};

export { Ship, GameBoard, Player };
