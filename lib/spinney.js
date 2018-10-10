class Spinney {
  constructor(canvas, ctx, impactBubble, initialPos, bubblesArray) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.incDx = impactBubble.dx;
    this.incDy = impactBubble.dy;
    this.centerX = 263;
    this.centerY = 320
    this.bubbles = bubblesArray;
    this.c = null;
    this.initialPos = this.adjustments(initialPos.x, initialPos.y);
    this.impactBubble = this.adjustments(impactBubble.x, impactBubble.y);
    this.adjustConstant();

  }

  adjustments(x, y) {
    const adjX = x - this.centerX;
    const adjY = y - this.centerY;
    return { x: adjX, y: adjY }
  }
  findChange(bubble) {
    const justments = this.adjustments(bubble.x, bubble.y);
    const r = Math.sqrt((justments.x * justments.x) + (justments.y * justments.y));
    const thetaO = this.c + Math.atan(justments.y/justments.x);
    return { x: Math.cos(thetaO)*r, y: Math.sin(thetaO)*r }
  }
  radToDeg(ang){
    return ang*180/Math.PI;
  }
   findImpactAngle() {
     const slopeA = (this.impactBubble.y - this.initialPos.y)/(this.impactBubble.x - this.initialPos.x);
     const slopeB = (this.impactBubble.y/this.impactBubble.x)
     const tanAng = ((slopeB - slopeA) /(1 + slopeB*slopeA));
     // const aaaaa = this.radToDeg(Math.atan(tanAng))
     // // console.log(aaaaa);
     console.log(tanAng);
     if (!tanAng) {
       return 0;
     } else {
       return Math.atan(tanAng);
     }
   }
   adjustConstant() {
     const ang = this.findImpactAngle();
     this.c = 0.1 * Math.sin(ang);
   }

  iterateSpin(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bubbles.forEach((bub) => {
      if (bub.color !== 'silver') {
        const justments = this.adjustments(bub.x, bub.y);
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
    this.c *= 0.980;
  }
}
module.exports = Spinney;


//
// class Spinney {
//   constructor(canvas, ctx, dx, dy, bubblesArray) {
//     this.canvas = canvas;
//     this.ctx = ctx;
//     this.incDx = dx;
//     this.incDy = dy;
//     this.outDx = null;
//     this.outDy = null;
//     this.centerX = 263;
//     this.centerY = 300
//     this.bubbles = bubblesArray;
//     this.interval = null;
//     this.drawBubble = this.drawBubble.bind(this);
//   }
//
//   adjustments(bubble) {
//     const adjX = bubble.x - this.centerX;
//     const adjY = bubble.y - this.centerY;
//     return { x: adjX, y: adjY }
//   }
//   findImpactAngle(bubble) {
//     const justments = this.adjustments(bubble);
//     const u1 = bubble.x * this.incDx;
//     const u2 = bubble.y * this.incDy;
//     const denominator = (Math.sqrt((justments.x * justments.x) + (justments.y * justments.y))) * (Math.sqrt((this.incDx * this.incDx) + (this.incDy * this.incDy)));
//     const result = ((u1 + u2)  / denominator);
//     return Math.acos(result);
//   }
//   drawBubble(bubble) {
//     this.ctx.beginPath();
//     this.ctx.arc(bubble.x, bubble.y, this.bubbleRad, 0, Math.PI*2, false);
//     this.ctx.fillStyle = `${bubble.color}`;
//     this.ctx.fill();
//     this.ctx.closePath();
//   }
//
//   iterateSpin(){
//     debugger
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.bubbles.forEach((bub) => {
//       const angle = this.findImpactAngle(bub);
//       const dx = Math.sin(angle);
//       const dy = Math.cos(angle);
//       bub.x += dx;
//       bub.y += dy;
//       this.drawBubble(bub);
//     })
//   }
//
// }
// // impacted bubble x and y
// // tells where the hit is on the circle
// //
// // active bubble dx and dy tell direction
//
// module.exports = Spinney;
