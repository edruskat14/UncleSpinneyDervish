const Bubble = require('./bubble');


class Game {

  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.colors = ['red', 'orange', 'yellow', 'purple', 'blue', 'green'];
    this.allBubbles = [];
    this.readyBubble = null;
    this.activeBubble = null;
    this.bubbleRad = 12;
    this.mousePosition = this.mousePosition.bind(this);
    this.interval = null;
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

  renderAllBubbles() {
    this.allBubbles.forEach((bubble) => {
      this.ctx.beginPath();
      this.ctx.arc(bubble.x, bubble.y, this.bubbleRad, 0, Math.PI*2, false);
      this.ctx.fillStyle = `${bubble.color}`;
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  newReady() {
    this.readyBubble = new Bubble(this.canvas.width/2, 14, this.colors[Math.floor(6 * Math.random())]);
    this.readyBubble.render();
  }

  movingBubble(bubble) {
    this.ctx.beginPath();
    this.ctx.arc(bubble.x, bubble.y, this.bubbleRad, 0, Math.PI*2, false);
    this.ctx.fillStyle = `${bubble.color}`;
    this.ctx.fill();
    this.ctx.closePath();
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
  eliminateTree(bubble){
    let queue = bubble.touching.slice();
    const choppingBlock = [bubble];
    const beenQueued = bubble.touching.slice().concat([bubble]);
    while (queue.length > 0) {
      debugger
      if (queue[0].color === bubble.color){
        choppingBlock.push(queue[0]);
        queue[0].touching.forEach((item) => {
          if(beenQueued.indexOf(item) === -1 && item.color === bubble.color) {
            queue.push(item);
            beenQueued.push(item);
          }
        })
      }
      queue.shift();
    }
    choppingBlock.forEach((bubble) => {
      this.allBubbles.splice(this.allBubbles.indexOf(bubble), 1)
    })
  }

  evaluateCollision(newBubble) {
    let addNew = true;
    console.log(this.allBubbles);
    this.allBubbles.forEach((oldBubble) => {
    if (this.inContact(oldBubble, newBubble) && oldBubble.color === newBubble.color) {
      if (this.isTouchingOwnColor(oldBubble)) {
        this.eliminateTree(oldBubble);
        addNew = false;
      } else {
        newBubble.touching.push(oldBubble);
        oldBubble.touching.push(newBubble);
      }
    } else if (this.inContact(oldBubble, newBubble)){
      newBubble.touching.push(oldBubble);
      oldBubble.touching.push(newBubble);

        // if (oldBubble.count >= 1) {
        //   debugger
        //   toDelete = oldBubble.touching.concat([oldBubble]);
        //   toDelete.forEach((deleteBubble) => {
        //     this.allBubbles.splice(this.allBubbles.indexOf(deleteBubble), 1);
        //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //     this.renderAllBubbles();
        //   })
        //   return;
        // } else {
        //   newBubble.touching = oldBubble.touching;
        //   newBubble.touching.push(oldBubble);
        //   this.allBubbles.push(newBubble);
        // }
      }
    })
    if(addNew) { this.allBubbles.push(newBubble); }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderAllBubbles();
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderAllBubbles();
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
       this.activeBubble.dx = 2 * (w / denominator);
       this.activeBubble.dy = 2 * (h / denominator);
       console.log('fire!')
       this.interval = setInterval(this.dibujar.bind(this), 5);
       this.canvas.removeEventListener('click', () => this.fireBubble(event));
     }
  }



}


module.exports = Game;
