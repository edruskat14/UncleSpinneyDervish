class Spinney {
  constructor(canvas, ctx, impactBubble, initialPos, bubblesArray, prev) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.incDx = impactBubble.dx;
    this.incDy = impactBubble.dy;
    this.centerX = 263;
    this.centerY = 320
    this.bubbles = bubblesArray;
    this.c = null;
    this.prevPos = this.adjustments(prev.x, prev.y);
    this.initialPos = this.adjustments(initialPos.x, initialPos.y);
    this.impactBubble = this.adjustments(impactBubble.x, impactBubble.y,);
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
  movingAway() {
    const current = this.impactBubble;
    const prev = this.prevPos;
    const currentLength = (Math.sqrt((current.x * current.x) + (current.y * current.y)));
    const prevLength = (Math.sqrt((prev.x * prev.x) + (prev.y * prev.y)));
    return (prevLength <= currentLength);
  }
  oppositeSign(a, b) {
    if(a < 0 && b > 0) {
      return true;
    } else if (a > 0 && b < 0) {
      return true;
    }
    return false;
  }
   findImpactAngle() {
     const slopeA = (this.impactBubble.y - this.initialPos.y)/(this.impactBubble.x - this.initialPos.x);
     const slopeB = (this.impactBubble.y/this.impactBubble.x)
     const tanAng = ((slopeB - slopeA) /(1 + slopeB*slopeA));
     const rlAng = Math.atan(tanAng);
     const angleInDeg = this.radToDeg(Math.atan(tanAng))
     if (!tanAng) {
       return 0;
     } else if (this.movingAway()) {
       return -Math.atan(tanAng);
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
