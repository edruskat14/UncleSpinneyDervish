const Game = require('./game');
const BubblePopulate = require('./bubble_populate');
const openingMessage = require('./opening_message');

let opener = true;
let audioPlay = true;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width=525;
canvas.height=600;

function toggleSoundPause(audio) {
  if (audioPlay) {
    audio.pause();
    audioPlay = false;
  } else {
    audio.play();
    audioPlay = true;
  }
}

openingMessage(canvas, ctx);

const startUp = (e) => {
  // e.preventDefault();
  if (opener === true) {
    opener = false;

    const backgroundMusic = new Audio('assets/sounds/background.mp3');
    backgroundMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    backgroundMusic.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const game = new Game(canvas, ctx);
    canvas.addEventListener('mousemove', () => game.renderShootAssist(event), false);
    canvas.addEventListener('click', () => game.fireBubble(event), false);
    document.addEventListener('keypress', () => checkKey(event), false)
    function checkKey(e) {
      if (!window.form) {
        e.preventDefault();
        if (e.key === " ") {
          if (game.over) {
            game.newGame()
          }
        } else if (e.key === 'm') {
          toggleSoundPause(backgroundMusic);
        } else if (e.key === 's') {
          game.toggleSoundFX();
        }
      }
    }
    let popo = new BubblePopulate(game);
    game.renderAllBubbles();
    game.renderScore();
    game.renderLine();
    game.newReady();
  }
}
document.addEventListener('keypress', () => startUp(event), false);
