class Spinney {
  constructor(canvas, ctx, impactBubble, bubblesArray) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.incDx = impactBubble.dx;
    this.incDy = impactBubble.dy;
    this.impactBubble = impactBubble;
    this.outDx = null;
    this.outDy = null;
    this.centerX = 263;
    this.centerY = 320
    this.bubbles = bubblesArray;
    this.interval = null;
    this.c = null;
    this.attackAngle();
  }
  attackAngle(){
    const justments = this.adjustments(this.impactBubble);
    const theta = Math.atan(this.incDx/this.incDy);
    const alpha = Math.atan(justments.y/justments.x);
    const ang = Math.PI - theta - alpha;
    if (ang < Math.PI / 2 || ang > 2 * Math.PI / 2) {
      this.c = 0.03* Math.sin(ang);
    } else {
      this.c = 0.03* -Math.sin(ang);
    }
  }
  // attackAngle(){
  //   const justments = this.adjustments(this.impactBubble);
  //   debugger
  //   const numerator = (this.incDy * this.incDx) + (justments.x * justments.y);
  //   const denominator = (Math.sqrt((this.incDy * this.incDy) + (this.incDx * this.incDx)) * Math.sqrt((justments.y * justments.y) + (justments.x * justments.x)))
  //   const imp = Math.acos(Math.abs(numerator / denominator));
  //   const ang = Math.sin(imp);
  //   if (ang < Math.PI / 2 || ang > 2 * Math.PI / 2) {
  //     this.c = 0.1* Math.sin(ang);
  //   } else {
  //     this.c = 0.1* -Math.sin(ang);
  //   }
  // }

  adjustments(bubble) {
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
  findImpactAngle(bubble) {
     const justments = this.adjustments(bubble);
     const u1 = bubble.x * this.incDx;
     const u2 = bubble.y * this.incDy;
     const denominator = (Math.sqrt((justments.x * justments.x) + (justments.y * justments.y))) * (Math.sqrt((this.incDx * this.incDx) + (this.incDy * this.incDy)));
     const result = ((u1 + u2)  / denominator);
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
    this.c *= 0.9930;
  }

}
// impacted bubble x and y
// tells where the hit is on the circle
//
// active bubble dx and dy tell direction

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
