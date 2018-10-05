const Game = require('./game');

class GameOver {
  constructor(game, canvas, ctx) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.renderScreen();
  }

  renderScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '41px 	Marker Felt';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`game over`, 170, 141);
    this.ctx.fillText(`final score: ${this.game.points}`, 150, 200);
    this.ctx.font = '20px Papyrus';
    this.ctx.fillText('Push space to play again', 159, 400);
  }

}

module.exports = GameOver;
