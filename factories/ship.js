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

export default Ship;
