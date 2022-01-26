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

const placeShip = function placeShip(ship, gameboard) {
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
    const [, x, y] = cell.dataset.info.split(',');
    // console.log(`${name} ${x} ${y}`);
    if (playerGameBoard[x][y].ship) {
      cell.style.backgroundColor = 'red';
    }
  });
};

showPlayerShipPosition(pGameBoard, gridContainer1);
showPlayerShipPosition(cGameBoard, gridContainer2);

function displayWinner(winner) {
  while (flexContainer.firstChild) {
    flexContainer.removeChild(flexContainer.lastChild);
  }
  const winnerName = winner.name;
  const winnerH2 = document.createElement('h2');
  let text;
  if (winnerName === 'player1') {
    text = 'You have won!';
  } else {
    text = 'The computer beat you!';
  }
  winnerH2.textContent = text;
  flexContainer.append(winnerH2);
}
let playerScore = 0;
let computerScore = 0;
const computerGuesses = new Map();

gridContainer2.addEventListener('click', (event) => {
  if (turn) {
    if (event.target.dataset.info === undefined) return;
    const [, x, y] = event.target.dataset.info.split(',');
    const cell = event.target;
    if (cell.classList.contains('previous')) return;
    if (cGameBoard.getBoard()[x][y].ship) {
      cell.style.backgroundColor = 'blue';
      playerScore += 1;
    } else {
      cell.style.backgroundColor = 'grey';
    }
    cell.classList.add('previous');
    turn = 0;
    if (playerScore === 17) {
      displayWinner(player);
    }
  }

  const playersCells = Array.from(gridContainer1.childNodes);
  let random = Math.floor(Math.random() * 100);
  while (computerGuesses.has(random)) {
    random = Math.floor(Math.random() * 100);
  }
  computerGuesses.set(random, random);
  const computerCell = playersCells[random];
  const [, xC, yC] = computerCell.dataset.info.split(',');
  if (pGameBoard.getBoard()[xC][yC].ship) {
    computerCell.style.backgroundColor = 'blue';
    computerScore += 1;
  } else {
    computerCell.style.backgroundColor = 'grey';
  }
  turn = 1;
  if (computerScore === 17) {
    displayWinner(computer);
  }
});
