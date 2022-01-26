import GameBoard from '../factories/gameboard.js';
import Ship from '../factories/ship.js';
import Player from '../factories/player.js';

let turn = 1;

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
const pGameBoard = GameBoard();
const computer = Player('computer');
const cGameBoard = GameBoard();

const createNewGame = function createNewGame(gameboard) {
  const ships = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];
  ships.forEach((ship) => placeShip(ship, gameboard));
};

createNewGame(pGameBoard);
createNewGame(cGameBoard);

const gridContainer1 = document.createElement('div');
gridContainer1.classList.add('grid-container');
gridContainer1.classList.add('player');

const gridContainer2 = document.createElement('div');
gridContainer2.classList.add('grid-container');
gridContainer2.classList.add('computer');

const flexContainer = document.querySelector('.flex-container');

function createGrid(user) {
  const gridSize = 10;
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

createGrid(player);
createGrid(computer);

const showPlayerShipPosition = function showPlayerShipPosition(
  gameboard,
  gridContainer
) {
  const playerGameBoard = gameboard.getBoard();
  //   console.log(playerGameBoard);
  Array.from(gridContainer.childNodes).forEach((cell) => {
    const [name, x, y] = cell.dataset.info.split(',');
    // console.log(`${name} ${x} ${y}`);
    if (playerGameBoard[x][y].ship) {
      cell.style.backgroundColor = 'red';
    }
  });
};

showPlayerShipPosition(pGameBoard, gridContainer1);
showPlayerShipPosition(cGameBoard, gridContainer2);

gridContainer2.addEventListener('click', (event) => {
  const [name, x, y] = event.target.dataset.info.split(',');
  if (turn) {
    const cell = event.target;
    if (cGameBoard.getBoard()[x][y].ship) {
      cell.style.backgroundColor = 'blue';
    } else {
      cell.style.backgroundColor = 'grey';
    }
    turn = 0;
  }

  const playersCells = Array.from(gridContainer1.childNodes);
  console.log(playersCells);
});
