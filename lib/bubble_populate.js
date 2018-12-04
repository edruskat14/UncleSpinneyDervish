
class BubblePopulate {

  constructor(game) {
    this.game = game;
  }

  populateBubbles() {
    let vert = 210;
    for(let i = -5; i < 6; i++) {
      let hori = 188 - 12.5 * (4 - Math.abs(i));
      let lel = 11-Math.abs(i)

      for(let j = lel; j > 0; j--) {
        let initBubble = new Bubble(hori, vert, this.colors[Math.floor(this.colors.length * Math.random())]);
        this.initialEvaluation(initBubble);
        this.allBubbles.push(initBubble)
        hori += 25;
      }
      vert += 22;
    }
    this.allBubbles[45].color = 'silver';
    const nwA = new BubbleAdder(this);
    nwA.makeNewBubbles();
  }
}
