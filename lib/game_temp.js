const Bubble = require('./bubble');


class GameTemp {

  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.colors = ['red', 'orange', 'yellow', 'purple', 'blue', 'green'];
    this.allBubbles = [];
    this.activeBubble = null;
    this.bubbleRad = 12;
    this.mousePosition = this.mousePosition.bind(this);
    this.interval = null;
    this.initialPosition = [this.canvas.width/2, 14];
  }


  inContact(bubA, bubB) {
    let xDist = bubA.x - bubB.x;
    let yDist = bubA.y - bubB.y;
    let totalDist = Math.sqrt((xDist * xDist) + (yDist * yDist));
    return totalDist < 2 * this.bubbleRad + 4;
  }
  initialEvaluation(newBubble) {
    this.allBubbles.forEach((oldBubble) => {
      if (this.inContact(newBubble, oldBubble) && oldBubble.color === newBubble.color) {
        newBubble.touching = oldBubble.touching.slice();
        newBubble.touching.push(oldBubble);
        oldBubble.touching.forEach((touched) => {
          if (touched.touching.indexOf(newBubble) === -1 && touched !== newBubble){
            touched.touching.push(newBubble);
            touched.count += 1;
          }
        })
        oldBubble.touching.push(newBubble);
        newBubble.count = oldBubble.count + 1;
        oldBubble.count += 1;
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
  updateInitialPos(bubble) {
    this.initialPosition = [bubble.x, bubble.y];
  }
  newActive() {
    this.activeBubble = new Bubble(this.canvas.width/2, 14, this.colors[Math.floor(6 * Math.random())]);
    this.activeBubble.render();
    this.updateInitialPos(this.activeBubble);
  }

  movingBubble(bubble) {
    this.ctx.beginPath();
    this.ctx.arc(bubble.x, bubble.y, this.bubbleRad, 0, Math.PI*2, false);
    this.ctx.fillStyle = `${bubble.color}`;
    this.ctx.fill();
    this.ctx.closePath();
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

  evaluateCollision(newBubble) {
    this.allBubbles.forEach((oldBubble) => {
    if (this.inContact(oldBubble, newBubble) && oldBubble.color === newBubble.color) {
        if (oldBubble.count >= 1) {
          debugger
          console.log(this.allBubbles);
          toDelete = oldBubble.touching.concat([oldBubble]);
          console.log(oldBubble.touching);
          console.log(toDelete)
          toDelete.forEach((deleteBubble) => {
            console.log(this.allBubbles.indexOf(deleteBubble));
            this.allBubbles.splice(this.allBubbles.indexOf(deleteBubble), 1);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.renderAllBubbles();
          })
          return;
        } else {
          newBubble.touching = oldBubble.touching;
          newBubble.touching.push(oldBubble);
          newBubble.count = oldBubble.count + 1;
          oldBubble.count += 1;
          this.allBubbles.push(newBubble);
        }
      }
    })
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


module.exports = GameTemp;
