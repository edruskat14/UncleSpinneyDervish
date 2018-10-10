const Game = require('./game');

class GameOver {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = game.ctx;
    this.renderScreen();
  }

  renderScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.game.renderAllBubbles();
    this.game.renderLine();
    this.ctx.font = '41px s';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`game over`, 170, 141);
    this.ctx.fillText(`final score: ${this.game.points}`, 150, 200);
    this.ctx.font = '20px Papyrus';
    this.ctx.fillText('Push space to play again', 159, 400);
  }

}

module.exports = GameOver;
