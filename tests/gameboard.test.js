import { expect, test } from '@jest/globals';
import { GameBoard, Ship } from '../main';

test('placing ship vertically', () => {
  const gameBoard = GameBoard();
  const ship = Ship(2);
  gameBoard.placeShip(0, 0, 'h', ship);
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    array[i] = [];
    for (let j = 0; j < 10; j += 1) {
      array[i][j] = {};
    }
  }
  array[0][0].ship = ship;
  array[0][1].ship = ship;
  expect(gameBoard.getBoard()).toEqual(array);
});

test('place ship horizontally', () => {
  const gameBoard = GameBoard();
  const ship = Ship(5);
  gameBoard.placeShip(1, 2, 'v', ship);
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    array[i] = [];
    for (let j = 0; j < 10; j += 1) {
      array[i][j] = {};
    }
  }
  array[1][2].ship = ship;
  array[2][2].ship = ship;
  array[3][2].ship = ship;
  array[4][2].ship = ship;
  array[5][2].ship = ship;
  expect(gameBoard.getBoard()).toEqual(array);
});

test('attack hit ship', () => {
  const gameBoard = GameBoard();
  const ship = Ship(2);
  gameBoard.placeShip(0, 0, 'h', ship);
  gameBoard.receiveAttack(0, 0);
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    array[i] = [];
    for (let j = 0; j < 10; j += 1) {
      array[i][j] = {};
    }
  }
  array[0][0].ship = ship;
  array[0][1].ship = ship;
  array[0][0].ship.hit();
  array[0][0].ship.hit();
  expect(gameBoard.getBoard()).toEqual(array);
});

test('attack missed ship', () => {
  const gameBoard = GameBoard();
  const ship = Ship(2);
  gameBoard.placeShip(0, 0, 'h', ship);
  gameBoard.receiveAttack(5, 5);
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    array[i] = [];
    for (let j = 0; j < 10; j += 1) {
      array[i][j] = {};
    }
  }
  array[0][0].ship = ship;
  array[0][1].ship = ship;
  const missedShots = [];
  missedShots.push([5, 5]);
  expect(gameBoard.getBoard()).toEqual(array);
  expect(gameBoard.getMisses()).toEqual(missedShots);
});

test('sunk all ships', () => {
  const gameBoard = GameBoard();
  const ship2 = Ship(2);
  gameBoard.placeShip(0, 0, 'h', ship2);
  const ship31 = Ship(3);
  ship31.positions = ship31.positions.map(() => 1);
  gameBoard.placeShip(2, 0, 'h', ship31);
  const ship32 = Ship(3);
  ship32.positions = ship32.positions.map(() => 1);
  gameBoard.placeShip(4, 0, 'h', ship32);
  const ship4 = Ship(4);
  ship4.positions = ship4.positions.map(() => 1);
  gameBoard.placeShip(6, 0, 'h', ship4);
  const ship5 = Ship(5);
  ship5.positions = ship5.positions.map(() => 1);
  gameBoard.placeShip(8, 0, 'h', ship5);
  gameBoard.receiveAttack(0, 0);
  expect(gameBoard.receiveAttack(0, 1)).toBe(true);
});
