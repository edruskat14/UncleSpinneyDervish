const openingMessage = (canvas, ctx) => {
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
  ctx.fillText(`The rules are simple:`, canvas.width/4 + 10, canvas.height/4 + 70, canvas.width/2 - 20)
  ctx.font = '16px serif'
  ctx.fillText(`Click to fire a bubble.`, canvas.width/4 + 10, canvas.height/4 + 100, canvas.width/2 - 20)
  ctx.fillText(`Connect three or more bubbles of the`, canvas.width/4 + 10, canvas.height/4 + 130, canvas.width/2 - 20)
  ctx.fillText(`same color to pop them (Bouncing off`, canvas.width/4 + 10, canvas.height/4 + 160, canvas.width/2 - 20)
  ctx.fillText(`walls is encouraged). If the main`, canvas.width/4 + 10, canvas.height/4 + 190, canvas.width/2 - 20)
  ctx.fillText(`bubble blob hits a wall you lose.`, canvas.width/4 + 10, canvas.height/4 + 220, canvas.width/2 - 20)
  ctx.fillText(`Press any key to begin`, canvas.width/4 + 41, canvas.height/4 + 270, canvas.width/2 - 20)
}

module.exports = openingMessage;
