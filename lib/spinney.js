class Spinney {
  constructor(canvas, ctx, dx, dy, bubblesArray) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.incDx = dx;
    this.incDy = dy;
    this.outDx = null;
    this.outDy = null;
    this.centerX = 263;
    this.centerY = 300
    this.bubbles = bubblesArray;
    this.interval = null;
    this.c = 0.02;
    // this.drawBubble = this.drawBubble.bind(this);
  }

  adjustments(bubble) {
    debugger
    const adjX = bubble.x - this.centerX;
    const adjY = bubble.y - this.centerY;
    return { x: adjX, y: adjY }
  }
  findChange(bubble) {
    const justments = this.adjustments(bubble);
    const r = Math.sqrt((justments.x * justments.x) + (justments.y * justments.y));
    const thetaO = this.c + Math.atan(justments.y/justments.x);
    return { x: Math.cos(thetaO)*r, y: Math.sin(thetaO)*r }
  }
  // drawBubble(bubble) {
  //   this.ctx.beginPath();
  //   this.ctx.arc(bubble.x, bubble.y, this.bubbleRad, 0, Math.PI*2, false);
  //   this.ctx.fillStyle = `${bubble.color}`;
  //   this.ctx.fill();
  //   this.ctx.closePath();
  // }

  iterateSpin(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bubbles.forEach((bub) => {
      if (bub.color !== 'silver') {
        const justments = this.adjustments(bub);
        const delta = this.findChange(bub);
        if (justments.x >= 0 && justments.y >= 0) {
          bub.x = this.centerX + delta.x;
          bub.y = this.centerY + delta.y;
        }
        else if (justments.x < 0 && justments.y >= 0) {
          bub.x = this.centerX - delta.x;
          bub.y = this.centerY - delta.y;
        }
        else if (justments.x >= 0 && justments.y < 0) {
          bub.x = this.centerX + delta.x;
          bub.y = this.centerY + delta.y;
        }
        else if (justments.x < 0 && justments.y < 0) {
          bub.x = this.centerX - delta.x;
          bub.y = this.centerY - delta.y;
        }
      }
    })
  }

}
// impacted bubble x and y
// tells where the hit is on the circle
//
// active bubble dx and dy tell direction

module.exports = Spinney;
