const openingMessage = (canvas, ctx) => {
  ctx.fillStyle = "#3BD8CE";
  ctx.fillRect(canvas.width/6, canvas.height/8, 2 * canvas.width/3, 3 * canvas.height/4);
  ctx.stroke();

  ctx.font = '41px serif';
  ctx.fillStyle = 'black';
  ctx.fillText(`Uncle Spinney Dervish`, 71, 41);
  ctx.fillStyle = 'white';
  ctx.font = '20px serif'
  ctx.fillText(`Welcome to U.S.D.`, canvas.width/4 + 50, canvas.height/4 - 20)
  ctx.font = '18px serif'
  ctx.fillText(`The rules are simple:`, canvas.width/4 + 10, canvas.height/4 + 10)
  ctx.font = '16px serif'
  ctx.fillText(`Click to fire a bubble.`, canvas.width/4 + 10, canvas.height/4 + 40)
  ctx.fillText(`Connect three or more bubbles of the`, canvas.width/4 + 10, canvas.height/4 + 70)
  ctx.fillText(`same color to pop them (Bouncing off`, canvas.width/4 + 10, canvas.height/4 + 100)
  ctx.fillText(`walls is encouraged). If the main`, canvas.width/4 + 10, canvas.height/4 + 130)
  ctx.fillText(`bubble blob hits a wall you lose.`, canvas.width/4 + 10, canvas.height/4 + 160)
  ctx.fillText(`Press M to mute music.`, canvas.width/4 + 10, canvas.height/4 + 210)
  ctx.fillText(`Press S to mute sound effects.`, canvas.width/4 + 10, canvas.height/4 + 250)
  ctx.fillText(`Press any key to begin`, canvas.width/4 + 41, canvas.height/4 + 300)
}

module.exports = openingMessage;
