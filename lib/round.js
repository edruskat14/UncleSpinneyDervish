const Bubble = require('./bubble');


class Round {

  constructor(canvas, ctx, multiplier) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.multiplier = multiplier;
    this.points = 0;
    this.colors = ['red', 'orange', 'yellow', 'purple', 'blue', 'green'];
    this.allBubbles = [];
    this.readyBubble = null;
    this.activeBubble = null;
    this.bubbleRad = 12;
    this.mousePosition = this.mousePosition.bind(this);
    this.interval = null;
  }

  roundOver() {
    return (!this.colors[0])
  }
  gameOver() {

  }
  inContact(bubA, bubB) {
    let xDist = bubA.x - bubB.x;
    let yDist = bubA.y - bubB.y;
    let totalDist = Math.sqrt((xDist * xDist) + (yDist * yDist));
    return totalDist < 2 * this.bubbleRad + 4;
  }
  initialEvaluation(newBubble) {
    this.allBubbles.forEach((oldBubble) => {
      if (this.inContact(newBubble, oldBubble)) {
        newBubble.touching.push(oldBubble);
        oldBubble.touching.push(newBubble);
      }
    })
  }
  populateBubbles() {
    let vert = 190;
    for(let i = -5; i < 6; i++) {
      let hori = 187 - 12.5 * (4 - Math.abs(i));
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
  }

  renderScore() {
    this.ctx.font = '19px serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Score: ${this.points}`, 25, 14);
  }

  newReady() {
    this.readyBubble = new Bubble(this.canvas.width/2, 14, this.colors[Math.floor(this.colors.length * Math.random())]);
    this.readyBubble.render();
  }


  movingBubble(bubble) {
    this.drawBubble(bubble);
    if(bubble.y + bubble.dy > this.canvas.height - this.bubbleRad || bubble.y + bubble.dy < this.bubbleRad) { bubble.dy = -bubble.dy }
    if(bubble.x + bubble.dx > this.canvas.width - this.bubbleRad || bubble.x + bubble.dx < this.bubbleRad) { bubble.dx = -bubble.dx }
    if (this.touchingAnyBubble(bubble)) {
      clearInterval(this.interval);
      this.interval = null;
      this.evaluateCollision(bubble);
    } else {
      bubble.x += bubble.dx;
      bubble.y += bubble.dy;
    }
  }

  touchingAnyBubble(bubble) {
    return this.allBubbles.some((bub) => {
      return this.inContact(bubble, bub);
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
    this.colors.forEach((color) => {
      if (!containedColors[color]) {
        this.colors.splice(this.colors.indexOf(color), 1);
      }
    })
  }

  // adjustColorOptions(bubble) {
  //   if (this.allBubbles.some((unit) => unit.color === bubble.color) === false) {
  //     this.colors.splice(this.colors.indexOf(bubble.color), 1);
  //   }
  // }
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
        toCheck[0].touching.forEach((next) => {
          if (next.color === 'silver') {
            toCheck = [];
            elim = false;
            return;
          } else if (beenChecked.indexOf(next) === -1) {
            toCheck.push(next);
            beenChecked.push(next);
          }
        })
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
        choppingBlock.push(queue[0]);
      })
      queue.shift();
    }
    choppingBlock.forEach((sacrifice) => {
      this.destroyBubble(sacrifice);
      this.points += 1 * this.multiplier;
    })
  }
  eliminateIslands(arr) {
    arr.forEach((unit) => {
      this.traceToCenter(unit);
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
    this.points += 1;
    this.eliminateIslands(islandTesters);
    this.adjustColorOptions();
  }

  evaluateCollision(newBubble) {
    let addNew = true;
    console.log(this.allBubbles);
    this.allBubbles.forEach((oldBubble) => {
    if (this.inContact(oldBubble, newBubble) && oldBubble.color === newBubble.color) {
      if (this.isTouchingOwnColor(oldBubble)) {
        this.eliminateColorTree(oldBubble);
        addNew = false;
      } else {
        newBubble.touching.push(oldBubble);
        oldBubble.touching.push(newBubble);
      }
    } else if (this.inContact(oldBubble, newBubble)){
      newBubble.touching.push(oldBubble);
      oldBubble.touching.push(newBubble);
      }
    })
    if(addNew) { this.allBubbles.push(newBubble); }
    this.reRender();
    this.newReady();
  }

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
       console.log('fire!')
       this.interval = setInterval(this.dibujar.bind(this), 5);
     }
  }



}


module.exports = Round;
