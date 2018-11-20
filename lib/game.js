const Bubble = require('./bubble');
const Spinney = require('./spinney');
const GameOver = require('./game_over');
const BubbleAdder = require('./bubble_adder');
const DervishMain = require('./dervish_main');

class Game {

  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.multiplier = 1;
    this.points = 0;
    this.colors = ['red', 'orange', '#ADFF2F', 'purple', 'blue', 'green'];
    this.allBubbles = [];
    this.readyBubble = null;
    this.activeBubble = null;
    this.bubbleRad = 12;
    this.mousePosition = this.mousePosition.bind(this);
    this.interval = null;
    this.spinney = null;
    this.prevX = null;
    this.prevY = null;
    this.adder = null;
    this.misses = 5;
    this.initialPosition = { x: this.canvas.width/2, y: 14 };
    this.over = false;
    this.soundFX = true;
  }
  resetMisses() {
    this.misses = 3;
  }

  resetColors() {
    this.colors = ['red', 'orange', '#ADFF2F', 'purple', 'blue', 'green'];
  }
  roundOver() {
    return (this.allBubbles.length <= 1);
  }

  gameOver() {
    return this.allBubbles.some((bub) => this.touchingEdge(bub));
  }

  startAnew() {
    document.getElementById('high-score-form').hidden = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.allBubbles = [];
    this.resetColors();
    this.populateBubbles();
    this.renderAllBubbles();
    this.renderScore();
    this.renderLine();
    this.newReady();
    this.updateInitialPos(this.readyBubble);
    this.resetMisses();
  }

  newRound() {
    this.multiplier += 1;
    this.startAnew();
  }

  endTheGame() {
    window.form = true;
    this.over = true;
    new GameOver(this);
    window.score = this.points;
    document.getElementById('high-score-form').hidden = false;
  }
  newGame() {
    this.multiplier = 1;
    this.points = 0;
    this.readyBubble = null;
    this.activeBubble = null;
    this.interval = null;
    this.spinney = null;
    this.adder = null;
    this.over = false;
    this.startAnew();
  }

  inContactStopMotion(bubA, bubB) {
    let xDist = bubA.x - bubB.x;
    let yDist = bubA.y - bubB.y;
    let totalDist = Math.sqrt((xDist * xDist) + (yDist * yDist));
    return totalDist < 2 * this.bubbleRad + 2;
  }
  inContactPop(bubA, bubB){
    let xDist = bubA.x - bubB.x;
    let yDist = bubA.y - bubB.y;
    let totalDist = Math.sqrt((xDist * xDist) + (yDist * yDist));
    return totalDist < 2 * this.bubbleRad + 6;
  }
  initialEvaluation(newBubble) {
    this.allBubbles.forEach((oldBubble) => {
      if (this.inContactStopMotion(newBubble, oldBubble)) {
        newBubble.touching.push(oldBubble);
        oldBubble.touching.push(newBubble);
      }
    })
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
  drawBubble(bubble) {
    this.ctx.beginPath();
    this.ctx.arc(bubble.x, bubble.y, this.bubbleRad, 0, Math.PI*2, false);
    this.ctx.fillStyle = `${bubble.color}`;
    this.ctx.fill();
    this.ctx.closePath();
  }


  renderAllBubbles() {
    this.allBubbles.forEach((bubble) => {
      this.drawBubble(bubble);
    });
  }

  renderLine() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 50);
    this.ctx.lineTo(this.canvas.width, 50);
    this.ctx.stroke();
  }

  renderScore() {
    this.ctx.font = '19px serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Score: ${this.points}`, 25, 18);
    this.ctx.fillText(`Round: ${this.multiplier}`, 425, 18)
  }
  reRender() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderAllBubbles();
    this.renderScore();
    this.renderLine();
  }


  updateInitialPos(bubble) {
    this.initialPosition = { x: bubble.x, y: bubble.y };
  }
  newReady() {
    this.readyBubble = new Bubble(this.canvas.width/2, 14, this.colors[Math.floor(this.colors.length * Math.random())]);
    this.readyBubble.render();
  }
  touchingEdge(bubble) {
    if ((bubble.x >= this.canvas.width - this.bubbleRad) || (bubble.x <= this.bubbleRad)) {
      return true;
    } else if ((bubble.y >= this.canvas.height - this.bubbleRad) || (bubble.y <= 50 + this.bubbleRad)) {
      return true;
    } else {
      return false;
    }
  }
  handleChangeDirection(bubble) {
    if(bubble.y + bubble.dy > this.canvas.height - this.bubbleRad || bubble.y + bubble.dy < this.bubbleRad) {
      bubble.dy = -bubble.dy;
      this.updateInitialPos(this.activeBubble);
      this.playBounceSound();
    }
    if(bubble.x + bubble.dx > this.canvas.width - this.bubbleRad || bubble.x + bubble.dx < this.bubbleRad) {
      bubble.dx = -bubble.dx;
      this.updateInitialPos(this.activeBubble);
      this.playBounceSound();
    }
  }

  movingBubble(bubble) {
    this.drawBubble(bubble);
    this.handleChangeDirection(bubble)
    if (this.touchingAnyBubble(bubble)) {
      clearInterval(this.interval);
      this.interval = null;
      if (this.gameOver()) {
        this.endTheGame();
      } else {
        this.evaluateCollision(bubble);
        if (this.misses === 0) {
          this.adder = new BubbleAdder(this);
          this.resetMisses();
        }
        this.spinney = new Spinney(this.canvas, this.ctx, bubble, this.initialPosition, this.allBubbles, {x: this.prevX, y: this.prevY});
        this.interval = setInterval(() => this.setRender(), 10)
        this.reRender();
      }
    } else {
      this.prevX = bubble.x;
      this.prevY = bubble.y;
      bubble.x += bubble.dx;
      bubble.y += bubble.dy;
    }
    if (this.roundOver()) {
      this.spinney.c = 0
      this.newRound();
    }
  }

  setRender(){
    this.spinney.iterateSpin();
    this.reRender();
    if (this.adder) {
      this.adder.lifeCycle();
    }
    if(this.gameOver()) {
      clearInterval(this.interval);
      this.interval = null;
      this.spinney = null;
      this.endTheGame();
    }
    else if (Math.abs(this.spinney.c) < 0.0008 && this.adder === null) {
      clearInterval(this.interval);
      this.interval = null;
      this.spinney = null;
      this.newReady();
      this.updateInitialPos(this.readyBubble);
    }
  }

  touchingAnyBubble(bubble) {
    return this.allBubbles.some((bub) => {
      return this.inContactStopMotion(bubble, bub);
    })
  }
  isTouchingOwnColor(bubble) {
    return bubble.touching.some((bub) => bub.color === bubble.color)
  }
  adjustColorOptions() {
    containedColors = {};
    this.allBubbles.forEach((bubble) => {
      containedColors[bubble.color] = true;
    })
    const sampleColors = this.colors.slice();
    sampleColors.forEach((color) => {
      if (!containedColors[color]) {
        this.colors.splice(this.colors.indexOf(color), 1);
      }
    })
  }

  traceToCenter(bubble) {
    const beenChecked = [bubble];
    let toCheck = [bubble];
    let elim = true;
    while (toCheck.length > 0) {
      if (toCheck[0].color === 'silver') {
        toCheck = [];
        elim = false;
        return;
      } else {
        let touch = toCheck[0].touching
        for(let i = 0; i < touch.length; i++){
          if (touch[i].color === 'silver') {
            toCheck = [];
            elim = false;
            return;
          } else if (beenChecked.indexOf(touch[i]) === -1) {
            toCheck.push(touch[i]);
            beenChecked.push(touch[i]);
          }
        }
      }
      toCheck.shift();
    }
    if (elim) {
      this.eliminateEntireTree(bubble);
    }
  }

  destroyBubble(bubble) {
    bubble.touching.forEach((bub) => {
      bub.touching.splice(bub.touching.indexOf(bubble), 1);
    })
    this.allBubbles.splice(this.allBubbles.indexOf(bubble), 1);
  }
  eliminateEntireTree(bubble) {
    const choppingBlock = [bubble];
    const queue = bubble.touching.slice();
    while (queue.length > 0) {
      queue[0].touching.forEach((item) => {
        if (queue.indexOf(item) === -1 && choppingBlock.indexOf(item) === -1) {
          queue.push(item);
        }
      })
      choppingBlock.push(queue[0]);
      queue.shift();
    }
    choppingBlock.forEach((sacrifice) => {
      this.destroyBubble(sacrifice);
      this.points += 1 * this.multiplier;
    })
  }
  eliminateIslands(arr) {
    arr.forEach((unit) => {
      if (this.allBubbles.indexOf(unit) >= 0) {
        this.traceToCenter(unit);
      }
    })
  }
  eliminateColorTree(bubble){
    let queue = bubble.touching.slice();
    const choppingBlock = [bubble];
    const testForIsland = [];
    const beenQueued = bubble.touching.slice().concat([bubble]);
    while (queue.length > 0) {
      if (queue[0].color === bubble.color){
        choppingBlock.push(queue[0]);
        queue[0].touching.forEach((item) => {
          if(beenQueued.indexOf(item) === -1 && item.color === bubble.color) {
            queue.push(item);
            beenQueued.push(item);
          } else if (testForIsland.indexOf(item) === -1 && item.color !== bubble.color) {
            testForIsland.push(item);
          }
        })
      } else if (testForIsland.indexOf(queue[0]) === -1) {
        testForIsland.push(queue[0]);
      }
      queue.shift();
    }
    choppingBlock.forEach((bubble) => {
      this.points += 1 * this.multiplier;
      this.destroyBubble(bubble);
    })
    this.points += 1 * this.multiplier;
    this.eliminateIslands(testForIsland);
    this.adjustColorOptions();
    this.playPopSound();
  }

  evaluateCollision(newBubble) {
    let contacted = [];
    this.allBubbles.forEach((oldBubble) => {
      if (this.inContactPop(oldBubble, newBubble)) {
        contacted.push(oldBubble);
      }
    })
    let sameColor = contacted.filter((bub) => {
      return (bub.color === newBubble.color);
    })
    if (sameColor.length > 1) {
      sameColor.forEach((bub) => {
        bub.touching.push(newBubble);
        newBubble.touching.push(bub);
      })
      this.allBubbles.push(newBubble);
      this.eliminateColorTree(newBubble);
    } else if (sameColor.length === 1 && this.isTouchingOwnColor(sameColor[0])) {
      this.eliminateColorTree(sameColor[0]);
    } else {
      contacted.forEach((bub) => {
        bub.touching.push(newBubble);
        newBubble.touching.push(bub);
      })
      this.allBubbles.push(newBubble);
      this.misses -= 1;
      this.playHitSound();
    }
  }

  mousePosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
  renderShootAssist(e) {
    if (this.readyBubble) {
      mousePos = this.mousePosition(e);
      denominator = Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y);
      const w = 10 * (mousePos.x / denominator);
      const h = 10 * (mousePos.y / denominator);

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.reRender();
      this.readyBubble.render();

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width/2, 14);
      this.ctx.lineTo(mousePos.x, mousePos.y);
      this.ctx.stroke();
    }
  }

  dibujar() {
    this.reRender();
    this.movingBubble(this.activeBubble);
  }

  fireBubble(e) {
    if (this.readyBubble){
      this.activeBubble = this.readyBubble;
      this.readyBubble = null;
       mousePos = this.mousePosition(e);
       w = mousePos.x - this.canvas.width/2;
       h = mousePos.y;
       denominator = Math.sqrt(w * w + h * h);
       this.activeBubble.dx = 4 * (w / denominator);
       this.activeBubble.dy = 4 * (h / denominator);
       this.testNum += 1;
       clearInterval(this.interval);
       this.interval = setInterval(this.dibujar.bind(this), 1);
     }
  }
  playPopSound() {
    if (this.soundFX) {
      const pop = new Audio('assets/sounds/pop.wav');
      pop.play();
    }
  }
  playBounceSound() {
    if (this.soundFX) {
      const bounce = new Audio('assets/sounds/bounce.wav');
      bounce.play();
    }
  }
  playHitSound() {
    if (this.soundFX) {
      const hit = new Audio('assets/sounds/hit.mp3');
      hit.play();
    }
  }
  toggleSoundFX() {
    if (this.soundFX) {
      this.soundFX = false;
    } else {
      this.soundFX = true;
    }
  }
}
module.exports = Game;
