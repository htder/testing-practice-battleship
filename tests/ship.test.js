import { expect, test } from '@jest/globals';
import { Ship } from '../main';

test('length of ship correct', () => {
  const ship = Ship(6);
  expect(ship.getLength()).toBe(6);
});

test('mark correct position as hit', () => {
  const ship = Ship(2);
  expect(ship.hit(0)).toEqual([1, 0]);
});

test('the ship has sunk', () => {
  const ship = Ship(3);
  ship.positions = ship.positions.map(() => 1);
  expect(ship.isSunk()).toBe(true);
});

test('the ship is not sunk', () => {
  const ship = Ship(4);
  ship.hit(1);
  expect(ship.isSunk()).toBe(false);
});
