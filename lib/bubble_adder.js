const Bubble = require('./bubble');

class BubbleAdder {
  constructor(game) {
    this.game = game;
    this.centerX = 263;
    this.centerY = 320;
    this.bubbles = this.makeNewBubbles();
  }

  makeNewBubbles() {
    const bubs = [];
    for (let i = 1; i <= 2; i++) {
      x = 0;
      y = (i * this.game.canvas.height / 3)
      color = this.game.colors[Math.floor(this.game.colors.length * Math.random())];
      bubs.push(new Bubble(x, y, color));
    }
    for (let i = 1; i <= 2; i++) {
      x = 525;
      y = (i * this.game.canvas.height / 3)
      color = this.game.colors[Math.floor(this.game.colors.length * Math.random())];
      bubs.push(new Bubble(x, y, color));
    }
    bubs.push(new Bubble(this.game.canvas.width/2, 0, this.game.colors[Math.floor(this.game.colors.length * Math.random())]));

    bubs.push(new Bubble(this.game.canvas.width/2, 600, this.game.colors[Math.floor(this.game.colors.length * Math.random())]));

    return bubs;
  }

  touchesAnotherAddedBubble(bubble) {
    return this.bubbles.some((bub) => {
      return this.game.inContactStopMotion(bubble, bub);
    })
  }

  moveEach() {
    if (this.bubbles.length === 0) {
      this.game.adder = null;
    }
    this.bubbles.forEach((bub) => {
      let adjX = bub.x - this.centerX;
      let adjY = bub.y - this.centerY;
      const denominator = Math.sqrt((adjX * adjX) + (adjY * adjY));
      let dx = 1 * (-adjX/denominator);
      let dy = 1 * (-adjY/denominator);
      bub.x = bub.x + dx;
      bub.y = bub.y + dy;
      this.game.drawBubble(bub);
      if (this.game.touchingAnyBubble(bub)) {
        this.bubbles.splice(this.bubbles.indexOf(bub), 1);
        this.game.allBubbles.forEach((bubble) => {
          if (this.game.inContactPop(bub, bubble)) {
            bubble.touching.push(bub);
            bub.touching.push(bubble);
          }
        })
        this.game.allBubbles.push(bub);
      }
    })
  }
  lifeCycle() {
    // this.game.reRender();
    this.moveEach();
  }

}

module.exports = BubbleAdder;
