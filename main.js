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

const placeShip = function (ship, gameboard) {
  let randomPlacement = createRandShipPlacement();
  let isPlacmentValid = gameboard.isShipPlacementValid(
    ...randomPlacement,
    ship
  );
  while (!isPlacmentValid) {
    randomPlacement = createRandShipPlacement();
    isPlacmentValid = gameboard.isShipPlacementValid(...randomPlacement, ship);
  }
  gameboard.placeShip(...randomPlacement, ship);
};

const player = Player('player1');
const computer = Player('computer');

const createNewGame = function () {
  // users game items

  const pGameBoard = GameBoard();
  const pShips = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];

  pShips.forEach((ship) => placeShip(ship, pGameBoard));

  // computers game items
  const cGameBoard = GameBoard();
  const cShips = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];
  cShips.forEach((ship) => placeShip(ship, cGameBoard));
};

createNewGame();

const gridContainer1 = document.createElement('div');
gridContainer1.classList.add('grid-container');
gridContainer1.classList.add('player');

const gridContainer2 = document.createElement('div');
gridContainer2.classList.add('grid-container');
gridContainer2.classList.add('computer');

const flexContainer = document.querySelector('.flex-container');

function createGrid(gridSize, user) {
  let gridContainer;
  if (user.name === 'player1') {
    gridContainer = gridContainer1;
  } else {
    gridContainer = gridContainer2;
  }
  const dimension = `${360 / gridSize}px`;
  for (let i = 0; i < gridSize; i += 1) {
    for (let j = 0; j < gridSize; j += 1) {
      const gridItem = document.createElement('div');
      gridItem.dataset.info = `${user.name},${i},${j}`;
      gridItem.style.width = dimension;
      gridItem.style.height = dimension;
      gridItem.classList.add('colorCell0');

      gridContainer.appendChild(gridItem);
    }
  }
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, ${dimension})`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${dimension})`;
  flexContainer.append(gridContainer);
}

createGrid(10, player);
createGrid(10, computer);
