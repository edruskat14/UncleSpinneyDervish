const Game = require('./game');
const openingMessage = require('./opening_message');

let opener = true;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width=525;
canvas.height=600;

openingMessage(canvas, ctx);

const startUp = (e) => {
  e.preventDefault();
  if (opener === true) {
    opener = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const game = new Game(canvas, ctx);
    canvas.addEventListener('mousemove', () => game.renderShootAssist(event), false);
    canvas.addEventListener('click', () => game.fireBubble(event), false);
    document.addEventListener('keypress', () => checkKey(event), false)
    function checkKey(e) {
      e.preventDefault();
      if (e.key === " ") {
        if (game.over) {
          game.newGame()
        }
      }
    }
    game.populateBubbles();
    game.renderAllBubbles();
    game.renderScore();
    game.renderLine();
    game.newReady();
  }
}
document.addEventListener('keypress', () => startUp(event), false);
