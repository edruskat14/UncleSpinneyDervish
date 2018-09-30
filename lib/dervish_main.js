const Round = require('./round');



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width=525;

canvas.height=600;
const bubbleRad = 12;
const round = new Round(canvas, ctx, 1);
round.populateBubbles();
round.renderAllBubbles();

function oneTurn(){
  round.newReady();
  canvas.addEventListener('click', () => round.fireBubble(event), false);
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
