const Bubble = require('./bubble');
const Spinney = require('./spinney');
const GameOver = require('./game_over');

class Game {

  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.multiplier = 1;
    this.points = 0;
    this.colors = ['red', 'orange', 'yellow', 'purple', 'blue', 'green'];
    this.allBubbles = [];
    this.readyBubble = null;
    this.activeBubble = null;
    this.bubbleRad = 12;
    this.mousePosition = this.mousePosition.bind(this);
    this.interval = null;
    this.spinney = null;
    this.initialPosition = { x: this.canvas.width/2, y: 14 };
    this.over = false;
  }

  resetColors() {
    this.colors = ['red', 'orange', 'yellow', 'purple', 'blue', 'green'];
  }
  roundOver() {
    return (this.allBubbles.length <= 1);
  }

  gameOver() {
    return this.allBubbles.some((bub) => this.touchingEdge(bub));
  }

  newRound() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.multiplier += 1;
    this.allBubbles = [];
    this.resetColors();
    this.populateBubbles();
    this.renderAllBubbles();
    this.renderScore();
    this.renderLine();
    this.newReady();
    this.updateInitialPos(this.readyBubble);
  }

  endTheGame() {
    this.over = true;
    new GameOver(this, this.canvas, this.ctx);
  }
  newGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.multiplier = 1;
    this.points = 0;
    this.colors = ['red', 'orange', 'yellow', 'purple', 'blue', 'green'];
    this.allBubbles = [];
    this.readyBubble = null;
    this.activeBubble = null;
    this.interval = null;
    this.spinney = null;
    this.over = false;
    this.populateBubbles();
    this.renderAllBubbles();
    this.renderScore();
    this.renderLine();
    this.newReady();
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

  reRender() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderAllBubbles();
    this.renderScore();
    this.renderLine();
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

  movingBubble(bubble) {
    this.drawBubble(bubble);
    if(bubble.y + bubble.dy > this.canvas.height - this.bubbleRad || bubble.y + bubble.dy < this.bubbleRad) {
      bubble.dy = -bubble.dy;
      this.updateInitialPos(this.activeBubble);
    }
    if(bubble.x + bubble.dx > this.canvas.width - this.bubbleRad || bubble.x + bubble.dx < this.bubbleRad) {
      bubble.dx = -bubble.dx;
      this.updateInitialPos(this.activeBubble);
    }
    if (this.touchingAnyBubble(bubble)) {
      clearInterval(this.interval);
      this.interval = null;
      if (this.gameOver()) {
        this.endTheGame();
      } else {
        this.evaluateCollision(bubble);
        this.spinney = new Spinney(this.canvas, this.ctx, bubble, this.initialPosition, this.allBubbles);
        this.interval = setInterval(() => this.setRender(this.spinney), 10)
        this.reRender();
      }
    } else {
      bubble.x += bubble.dx;
      bubble.y += bubble.dy;
    }
    if (this.roundOver()) {
      this.newRound();
    }
  }
  setRender(spinney){
    spinney.iterateSpin();
    this.reRender();
    if(this.gameOver()) {
      clearInterval(this.interval);
      this.interval = null;
      this.spinney = null;
      this.endTheGame();
    }
    else if (Math.abs(this.spinney.c) < 0.0008) {
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

  // traceToCenter(bubble) {
  //   const beenChecked = [bubble];
  //   let toCheck = [bubble];
  //   let elim = true;
  //   while (toCheck.length > 0) {
  //     if (toCheck[0].color === 'silver') {
  //       toCheck = [];
  //       elim = false;
  //       return;
  //     } else {
  //       toCheck[0].touching.forEach((next) => {
  //         if (next.color === 'silver') {
  //           toCheck = [];
  //           elim = false;
  //           return;
  //         } else if (beenChecked.indexOf(next) === -1) {
  //           toCheck.push(next);
  //           beenChecked.push(next);
  //         }
  //       })
  //     }
  //     toCheck.shift();
  //   }
  //   if (elim) {
  //     this.eliminateEntireTree(bubble);
  //   }
  // }
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
    const islandTesters = [];
    const beenQueued = bubble.touching.slice().concat([bubble]);
    while (queue.length > 0) {
      if (queue[0].color === bubble.color){
        choppingBlock.push(queue[0]);
        queue[0].touching.forEach((item) => {
          if(beenQueued.indexOf(item) === -1 && item.color === bubble.color) {
            queue.push(item);
            beenQueued.push(item);
          } else if (islandTesters.indexOf(item) === -1 && item.color !== bubble.color) {
            islandTesters.push(item);
          }
        })
      } else if (islandTesters.indexOf(queue[0]) === -1) {
        islandTesters.push(queue[0]);
      }
      queue.shift();
    }
    choppingBlock.forEach((bubble) => {
      this.points += 1 * this.multiplier;
      this.destroyBubble(bubble);
    })
    this.points += 1 * this.multiplier;
    this.eliminateIslands(islandTesters);
    this.adjustColorOptions();
  }

  evaluateCollision(newBubble) {
    let contacted = [];
    this.allBubbles.forEach((oldBubble) => {
      if (this.inContactPop(oldBubble, newBubble)) {
        contacted.push(oldBubble);
      }
    })
    debugger
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
    }
  }

  // evaluateCollision(newBubble) {
  //   let addNew = true;
  //   this.allBubbles.forEach((oldBubble) => {
  //   if (this.inContactPop(oldBubble, newBubble) && oldBubble.color === newBubble.color) {
  //     if (this.isTouchingOwnColor(oldBubble)) {
  //       this.eliminateColorTree(oldBubble);
  //       addNew = false;
  //     } else if (this.isTouchingOwnColor(newBubble)) {
  //       this.eliminateColorTree(newBubble);
  //       this.eliminateColorTree(oldBubble);
  //     } else {
  //       newBubble.touching.push(oldBubble);
  //       oldBubble.touching.push(newBubble);
  //     }
  //   } else if (this.inContactPop(oldBubble, newBubble)){
  //     newBubble.touching.push(oldBubble);
  //     oldBubble.touching.push(newBubble);
  //     }
  //   })
  //   if(addNew) { this.allBubbles.push(newBubble); }
  //   console.log(this.allBubbles)
  // }

  mousePosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
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
       console.log('fire!')
       this.interval = setInterval(this.dibujar.bind(this), 1);
     }
  }



}


module.exports = Game;
