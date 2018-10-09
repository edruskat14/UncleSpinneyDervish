 const Game = require('./game');

let opener = true;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width=525;
canvas.height=600;

ctx.fillStyle = "#3BD8CE";
ctx.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
ctx.stroke();

ctx.font = '41px serif';
ctx.fillStyle = 'black';
ctx.fillText(`Uncle Spinney Dervish`, 71, 41);
ctx.fillStyle = 'white';
ctx.font = '20px serif'
ctx.fillText(`Welcome to U.S.D.`, canvas.width/4 + 50, canvas.height/4 + 30,)
ctx.font = '18px serif'
ctx.fillText(`The rules are simple:`, canvas.width/4 + 10, canvas.height/4 + 80, canvas.width/2 - 20)
ctx.font = '16px serif'
ctx.fillText(`Connect three or more bubbles of the`, canvas.width/4 + 10, canvas.height/4 + 110, canvas.width/2 - 20)
ctx.fillText(`same color to pop them (Bouncing off`, canvas.width/4 + 10, canvas.height/4 + 140, canvas.width/2 - 20)
ctx.fillText(`walls is encouraged). If the main`, canvas.width/4 + 10, canvas.height/4 + 170, canvas.width/2 - 20)
ctx.fillText(`bubble blob hits a wall you lose.`, canvas.width/4 + 10, canvas.height/4 + 200, canvas.width/2 - 20)
ctx.fillText(`Push any button to begin`, canvas.width/4 + 41, canvas.height/4 + 260, canvas.width/2 - 20)

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
