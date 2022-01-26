import GameBoard from '../factories/gameboard.js';
import Ship from '../factories/ship.js';
import Player from '../factories/player.js';

// users game items
const player = Player('player1');
const pGameBoard = GameBoard();
const pShip2 = Ship(2);
const pShip31 = Ship(3);
const pShip32 = Ship(3);
const pShip4 = Ship(4);
const pShip5 = Ship(5);

// computers game items
const computer = Player('player2');
const cGameBoard = GameBoard();
const cShip2 = Ship(2);
const cShip31 = Ship(3);
const cShip32 = Ship(3);
const cShip4 = Ship(4);
const cShip5 = Ship(5);
