const Game = require('./game');


console.log('hello')
console.log('why')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width=525;

canvas.height=600;
const bubbleRad = 12;
console.log('yo')
const game = new Game(canvas, ctx);
console.log(game);
game.populateBubbles();
game.renderAllBubbles();

function readyToFire() {

}
function oneTurn(){
  game.newActive();
  const help = canvas.addEventListener('click', () => game.fireBubble(event), false);
  canvas.removeEventListener('click', () => game.fireBubble(event), false);
}
oneTurn();



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
