const Player = function Player(name) {
  const player = {};
  const alreadyHit = [];

  player.name = name;

  player.getName = function getName() {
    return player.name;
  };

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

export default Player;
