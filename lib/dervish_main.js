 const Game = require('./game');


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width=525;
canvas.height=600;
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

// game.renderGameOver();


// function dibujar() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         renderAllBubbles(allBubbles);
//         movingBubble();
//       }
//       const drawControls = {
//         drawContinuous: function(){ draw = setInterval(dibujar, 20); console.log(allBubbles.length) },
//         stopDrawing: function(){ clearInterval(draw); console.log(allBubbles.length)}
//       }
//       drawControls.drawContinuous();
//       if (turnOver) { drawControls.stopDrawing() }
//       return;
