import GameBoard from '../factories/gameboard.js';
import Ship from '../factories/ship.js';
import Player from '../factories/player.js';

const createRandShipPlacement = function () {
  return [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 2) === 0 ? 'h' : 'v',
  ];
};

const createNewGame = function () {
  // users game items
  const player = Player('player1');
  const pGameBoard = GameBoard();
  const pShip2 = Ship(2);
  const pShip31 = Ship(3);
  const pShip32 = Ship(3);
  const pShip4 = Ship(4);
  const pShip5 = Ship(5);

  const pShips = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];
  pShips.forEach((ship) => {
    let randomPlacement = createRandShipPlacement();
    let isPlacmentValid = pGameBoard.isShipPlacementValid(
      ...randomPlacement,
      ship
    );
    while (!isPlacmentValid) {
      randomPlacement = createRandShipPlacement();
      isPlacmentValid = pGameBoard.isShipPlacementValid(
        ...randomPlacement,
        ship
      );
    }
    pGameBoard.placeShip(...randomPlacement, ship);
    console.log(...randomPlacement, ship);
    console.table(pGameBoard.getBoard());
  });

  // computers game items
  const computer = Player('player2');
  const cGameBoard = GameBoard();
  const cShip2 = Ship(2);
  const cShip31 = Ship(3);
  const cShip32 = Ship(3);
  const cShip4 = Ship(4);
  const cShip5 = Ship(5);
};

createNewGame();
