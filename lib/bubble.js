class Bubble {

  constructor(x, y, color) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.touching = [];
  }

  render() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(this.x, this.y, 12, 0, Math.PI*2, false);
    ctx.fillStyle = `${this.color}`;
    ctx.fill();
    ctx.closePath();
    return this;
  }
}

module.exports = Bubble;
