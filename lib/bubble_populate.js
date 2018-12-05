const Bubble = require('./bubble');

class BubblePopulate {

  constructor(game) {
    this.game = game;
    this.populateBubbles();
  }

  populateBubbles() {
    if (this.game.multiplier === 1) {
      this.firstRound();
    } else {
      this.subsequentRounds();
    }
  }

  firstRound() {
    let vert = 254;
    for(let i = -3; i < 4; i++) {
      let hori = 188 - 12.5 * (0 - Math.abs(i));
      let lel = 7-Math.abs(i)

      for(let j = lel; j > 0; j--) {
        let initBubble = new Bubble(hori, vert, this.game.colors[Math.floor(this.game.colors.length * Math.random())]);
        this.game.initialEvaluation(initBubble);
        this.game.allBubbles.push(initBubble)
        hori += 25;
      }
      vert += 22;
    }
    this.game.allBubbles[18].color = 'silver';
    console.log(this.game.allBubbles);
  }

  subsequentRounds() {
    let vert = 210;
    for(let i = -5; i < 6; i++) {
      let hori = 188 - 12.5 * (4 - Math.abs(i));
      let lel = 11-Math.abs(i)

      for(let j = lel; j > 0; j--) {
        let initBubble = new Bubble(hori, vert, this.game.colors[Math.floor(this.game.colors.length * Math.random())]);
        this.game.initialEvaluation(initBubble);
        this.game.allBubbles.push(initBubble)
        hori += 25;
      }
      vert += 22;
    }
    this.game.allBubbles[45].color = 'silver';
  }
}
module.exports = BubblePopulate;
