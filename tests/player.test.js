import { expect, test } from '@jest/globals';
import { GameBoard, Ship, Player } from '../main';

test('player attacking new position', () => {
  const gameBoard = GameBoard();
  const ship1 = Ship(2);
  gameBoard.placeShip(0, 0, 'h', ship1);
  const player = Player();
  player.attack(0, 0, gameBoard);

  const array = [];
  for (let i = 0; i < 10; i += 1) {
    array[i] = [];
    for (let j = 0; j < 10; j += 1) {
      array[i][j] = {};
    }
  }
  array[0][0].ship = ship1;
  array[0][1].ship = ship1;
  array[0][0].ship.hit();
  expect(gameBoard.getBoard()).toEqual(array);
});

test('player attack same position twice', () => {
  const gameBoard = GameBoard();
  const ship1 = Ship(2);
  gameBoard.placeShip(0, 0, 'h', ship1);
  const player = Player();
  player.attack(0, 0, gameBoard);
  player.attack(0, 0, gameBoard);

  const array = [];
  for (let i = 0; i < 10; i += 1) {
    array[i] = [];
    for (let j = 0; j < 10; j += 1) {
      array[i][j] = {};
    }
  }
  array[0][0].ship = ship1;
  array[0][1].ship = ship1;
  array[0][0].ship.hit();
  expect(gameBoard.getBoard()).toEqual(array);
});
