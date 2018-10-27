/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/dervish_main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/bubble.js":
/*!***********************!*\
  !*** ./lib/bubble.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bubble =
/*#__PURE__*/
function () {
  function Bubble(x, y, color) {
    _classCallCheck(this, Bubble);

    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.touching = [];
  }

  _createClass(Bubble, [{
    key: "render",
    value: function render() {
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(this.x, this.y, 12, 0, Math.PI * 2, false);
      ctx.fillStyle = "".concat(this.color);
      ctx.fill();
      ctx.closePath();
      return this;
    }
  }]);

  return Bubble;
}();

module.exports = Bubble;

/***/ }),

/***/ "./lib/bubble_adder.js":
/*!*****************************!*\
  !*** ./lib/bubble_adder.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bubble = __webpack_require__(/*! ./bubble */ "./lib/bubble.js");

var BubbleAdder =
/*#__PURE__*/
function () {
  function BubbleAdder(game) {
    _classCallCheck(this, BubbleAdder);

    this.game = game;
    this.centerX = 263;
    this.centerY = 320;
    this.bubbles = this.makeNewBubbles();
  }

  _createClass(BubbleAdder, [{
    key: "makeNewBubbles",
    value: function makeNewBubbles() {
      var bubs = [];

      for (var i = 1; i <= 2; i++) {
        x = 0;
        y = i * this.game.canvas.height / 3;
        color = this.game.colors[Math.floor(this.game.colors.length * Math.random())];
        bubs.push(new Bubble(x, y, color));
      }

      for (var _i = 1; _i <= 2; _i++) {
        x = 525;
        y = _i * this.game.canvas.height / 3;
        color = this.game.colors[Math.floor(this.game.colors.length * Math.random())];
        bubs.push(new Bubble(x, y, color));
      }

      bubs.push(new Bubble(this.game.canvas.width / 2, 0, this.game.colors[Math.floor(this.game.colors.length * Math.random())]));
      bubs.push(new Bubble(this.game.canvas.width / 2, 600, this.game.colors[Math.floor(this.game.colors.length * Math.random())]));
      return bubs;
    }
  }, {
    key: "touchesAnotherAddedBubble",
    value: function touchesAnotherAddedBubble(bubble) {
      var _this = this;

      return this.bubbles.some(function (bub) {
        return _this.game.inContactStopMotion(bubble, bub);
      });
    }
  }, {
    key: "moveEach",
    value: function moveEach() {
      var _this2 = this;

      if (this.bubbles.length === 0) {
        this.game.adder = null;
      }

      this.bubbles.forEach(function (bub) {
        var adjX = bub.x - _this2.centerX;
        var adjY = bub.y - _this2.centerY;
        var denominator = Math.sqrt(adjX * adjX + adjY * adjY);
        var dx = 1 * (-adjX / denominator);
        var dy = 1 * (-adjY / denominator);
        bub.x = bub.x + dx;
        bub.y = bub.y + dy;

        _this2.game.drawBubble(bub);

        if (_this2.game.touchingAnyBubble(bub)) {
          _this2.bubbles.splice(_this2.bubbles.indexOf(bub), 1);

          _this2.game.allBubbles.forEach(function (bubble) {
            if (_this2.game.inContactPop(bub, bubble)) {
              bubble.touching.push(bub);
              bub.touching.push(bubble);
            }
          });

          _this2.game.allBubbles.push(bub);
        }
      });
    }
  }, {
    key: "lifeCycle",
    value: function lifeCycle() {
      this.moveEach();
    }
  }]);

  return BubbleAdder;
}();

module.exports = BubbleAdder;

/***/ }),

/***/ "./lib/dervish_main.js":
/*!*****************************!*\
  !*** ./lib/dervish_main.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(/*! ./game */ "./lib/game.js");

var openingMessage = __webpack_require__(/*! ./opening_message */ "./lib/opening_message.js");

var opener = true;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 525;
canvas.height = 600;
openingMessage(canvas, ctx);

var startUp = function startUp(e) {
  e.preventDefault();

  if (opener === true) {
    var checkKey = function checkKey(e) {
      e.preventDefault();

      if (e.key === " ") {
        if (game.over) {
          game.newGame();
        }
      }
    };

    opener = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var game = new Game(canvas, ctx);
    canvas.addEventListener('mousemove', function () {
      return game.renderShootAssist(event);
    }, false);
    canvas.addEventListener('click', function () {
      return game.fireBubble(event);
    }, false);
    document.addEventListener('keypress', function () {
      return checkKey(event);
    }, false);
    game.populateBubbles();
    game.renderAllBubbles();
    game.renderScore();
    game.renderLine();
    game.newReady();
  }
};

document.addEventListener('keypress', function () {
  return startUp(event);
}, false);

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bubble = __webpack_require__(/*! ./bubble */ "./lib/bubble.js");

var Spinney = __webpack_require__(/*! ./spinney */ "./lib/spinney.js");

var GameOver = __webpack_require__(/*! ./game_over */ "./lib/game_over.js");

var BubbleAdder = __webpack_require__(/*! ./bubble_adder */ "./lib/bubble_adder.js");

var Game =
/*#__PURE__*/
function () {
  function Game(canvas, ctx) {
    _classCallCheck(this, Game);

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
    this.initialPosition = {
      x: this.canvas.width / 2,
      y: 14
    };
    this.over = false;
  }

  _createClass(Game, [{
    key: "resetMisses",
    value: function resetMisses() {
      this.misses = 3;
    }
  }, {
    key: "resetColors",
    value: function resetColors() {
      this.colors = ['red', 'orange', '#ADFF2F', 'purple', 'blue', 'green'];
    }
  }, {
    key: "roundOver",
    value: function roundOver() {
      return this.allBubbles.length <= 1;
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      var _this = this;

      return this.allBubbles.some(function (bub) {
        return _this.touchingEdge(bub);
      });
    }
  }, {
    key: "startAnew",
    value: function startAnew() {
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
  }, {
    key: "newRound",
    value: function newRound() {
      this.multiplier += 1;
      this.startAnew();
    }
  }, {
    key: "endTheGame",
    value: function endTheGame() {
      this.over = true;
      new GameOver(this);
    }
  }, {
    key: "newGame",
    value: function newGame() {
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
  }, {
    key: "inContactStopMotion",
    value: function inContactStopMotion(bubA, bubB) {
      var xDist = bubA.x - bubB.x;
      var yDist = bubA.y - bubB.y;
      var totalDist = Math.sqrt(xDist * xDist + yDist * yDist);
      return totalDist < 2 * this.bubbleRad + 2;
    }
  }, {
    key: "inContactPop",
    value: function inContactPop(bubA, bubB) {
      var xDist = bubA.x - bubB.x;
      var yDist = bubA.y - bubB.y;
      var totalDist = Math.sqrt(xDist * xDist + yDist * yDist);
      return totalDist < 2 * this.bubbleRad + 6;
    }
  }, {
    key: "initialEvaluation",
    value: function initialEvaluation(newBubble) {
      var _this2 = this;

      this.allBubbles.forEach(function (oldBubble) {
        if (_this2.inContactStopMotion(newBubble, oldBubble)) {
          newBubble.touching.push(oldBubble);
          oldBubble.touching.push(newBubble);
        }
      });
    }
  }, {
    key: "populateBubbles",
    value: function populateBubbles() {
      var vert = 210;

      for (var i = -5; i < 6; i++) {
        var hori = 188 - 12.5 * (4 - Math.abs(i));
        var lel = 11 - Math.abs(i);

        for (var j = lel; j > 0; j--) {
          var initBubble = new Bubble(hori, vert, this.colors[Math.floor(this.colors.length * Math.random())]);
          this.initialEvaluation(initBubble);
          this.allBubbles.push(initBubble);
          hori += 25;
        }

        vert += 22;
      }

      this.allBubbles[45].color = 'silver';
      var nwA = new BubbleAdder(this);
      nwA.makeNewBubbles();
    }
  }, {
    key: "drawBubble",
    value: function drawBubble(bubble) {
      this.ctx.beginPath();
      this.ctx.arc(bubble.x, bubble.y, this.bubbleRad, 0, Math.PI * 2, false);
      this.ctx.fillStyle = "".concat(bubble.color);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "renderAllBubbles",
    value: function renderAllBubbles() {
      var _this3 = this;

      this.allBubbles.forEach(function (bubble) {
        _this3.drawBubble(bubble);
      });
    }
  }, {
    key: "renderLine",
    value: function renderLine() {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 50);
      this.ctx.lineTo(this.canvas.width, 50);
      this.ctx.stroke();
    }
  }, {
    key: "renderScore",
    value: function renderScore() {
      this.ctx.font = '19px serif';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText("Score: ".concat(this.points), 25, 18);
      this.ctx.fillText("Round: ".concat(this.multiplier), 425, 18);
    }
  }, {
    key: "reRender",
    value: function reRender() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.renderAllBubbles();
      this.renderScore();
      this.renderLine();
    }
  }, {
    key: "updateInitialPos",
    value: function updateInitialPos(bubble) {
      this.initialPosition = {
        x: bubble.x,
        y: bubble.y
      };
    }
  }, {
    key: "newReady",
    value: function newReady() {
      this.readyBubble = new Bubble(this.canvas.width / 2, 14, this.colors[Math.floor(this.colors.length * Math.random())]);
      this.readyBubble.render();
    }
  }, {
    key: "touchingEdge",
    value: function touchingEdge(bubble) {
      if (bubble.x >= this.canvas.width - this.bubbleRad || bubble.x <= this.bubbleRad) {
        return true;
      } else if (bubble.y >= this.canvas.height - this.bubbleRad || bubble.y <= 50 + this.bubbleRad) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "handleChangeDirection",
    value: function handleChangeDirection(bubble) {
      if (bubble.y + bubble.dy > this.canvas.height - this.bubbleRad || bubble.y + bubble.dy < this.bubbleRad) {
        bubble.dy = -bubble.dy;
        this.updateInitialPos(this.activeBubble);
      }

      if (bubble.x + bubble.dx > this.canvas.width - this.bubbleRad || bubble.x + bubble.dx < this.bubbleRad) {
        bubble.dx = -bubble.dx;
        this.updateInitialPos(this.activeBubble);
      }
    }
  }, {
    key: "movingBubble",
    value: function movingBubble(bubble) {
      var _this4 = this;

      this.drawBubble(bubble);
      this.handleChangeDirection(bubble);

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

          this.spinney = new Spinney(this.canvas, this.ctx, bubble, this.initialPosition, this.allBubbles, {
            x: this.prevX,
            y: this.prevY
          });
          this.interval = setInterval(function () {
            return _this4.setRender();
          }, 10);
          this.reRender();
        }
      } else {
        this.prevX = bubble.x;
        this.prevY = bubble.y;
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;
      }

      if (this.roundOver()) {
        this.newRound();
      }
    }
  }, {
    key: "setRender",
    value: function setRender() {
      this.spinney.iterateSpin();
      this.reRender();

      if (this.adder) {
        this.adder.lifeCycle();
      }

      if (this.gameOver()) {
        clearInterval(this.interval);
        this.interval = null;
        this.spinney = null;
        this.endTheGame();
      } else if (Math.abs(this.spinney.c) < 0.0008 && this.adder === null) {
        clearInterval(this.interval);
        this.interval = null;
        this.spinney = null;
        this.newReady();
        this.updateInitialPos(this.readyBubble);
      }
    }
  }, {
    key: "touchingAnyBubble",
    value: function touchingAnyBubble(bubble) {
      var _this5 = this;

      return this.allBubbles.some(function (bub) {
        return _this5.inContactStopMotion(bubble, bub);
      });
    }
  }, {
    key: "isTouchingOwnColor",
    value: function isTouchingOwnColor(bubble) {
      return bubble.touching.some(function (bub) {
        return bub.color === bubble.color;
      });
    }
  }, {
    key: "adjustColorOptions",
    value: function adjustColorOptions() {
      var _this6 = this;

      containedColors = {};
      this.allBubbles.forEach(function (bubble) {
        containedColors[bubble.color] = true;
      });
      var sampleColors = this.colors.slice();
      sampleColors.forEach(function (color) {
        if (!containedColors[color]) {
          _this6.colors.splice(_this6.colors.indexOf(color), 1);
        }
      });
    }
  }, {
    key: "traceToCenter",
    value: function traceToCenter(bubble) {
      var beenChecked = [bubble];
      var toCheck = [bubble];
      var elim = true;

      while (toCheck.length > 0) {
        if (toCheck[0].color === 'silver') {
          toCheck = [];
          elim = false;
          return;
        } else {
          var touch = toCheck[0].touching;

          for (var i = 0; i < touch.length; i++) {
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
  }, {
    key: "destroyBubble",
    value: function destroyBubble(bubble) {
      bubble.touching.forEach(function (bub) {
        bub.touching.splice(bub.touching.indexOf(bubble), 1);
      });
      this.allBubbles.splice(this.allBubbles.indexOf(bubble), 1);
    }
  }, {
    key: "eliminateEntireTree",
    value: function eliminateEntireTree(bubble) {
      var _this7 = this;

      var choppingBlock = [bubble];
      var queue = bubble.touching.slice();

      while (queue.length > 0) {
        queue[0].touching.forEach(function (item) {
          if (queue.indexOf(item) === -1 && choppingBlock.indexOf(item) === -1) {
            queue.push(item);
          }
        });
        choppingBlock.push(queue[0]);
        queue.shift();
      }

      choppingBlock.forEach(function (sacrifice) {
        _this7.destroyBubble(sacrifice);

        _this7.points += 1 * _this7.multiplier;
      });
    }
  }, {
    key: "eliminateIslands",
    value: function eliminateIslands(arr) {
      var _this8 = this;

      arr.forEach(function (unit) {
        if (_this8.allBubbles.indexOf(unit) >= 0) {
          _this8.traceToCenter(unit);
        }
      });
    }
  }, {
    key: "eliminateColorTree",
    value: function eliminateColorTree(bubble) {
      var _this9 = this;

      var queue = bubble.touching.slice();
      var choppingBlock = [bubble];
      var islandTesters = [];
      var beenQueued = bubble.touching.slice().concat([bubble]);

      while (queue.length > 0) {
        if (queue[0].color === bubble.color) {
          choppingBlock.push(queue[0]);
          queue[0].touching.forEach(function (item) {
            if (beenQueued.indexOf(item) === -1 && item.color === bubble.color) {
              queue.push(item);
              beenQueued.push(item);
            } else if (islandTesters.indexOf(item) === -1 && item.color !== bubble.color) {
              islandTesters.push(item);
            }
          });
        } else if (islandTesters.indexOf(queue[0]) === -1) {
          islandTesters.push(queue[0]);
        }

        queue.shift();
      }

      choppingBlock.forEach(function (bubble) {
        _this9.points += 1 * _this9.multiplier;

        _this9.destroyBubble(bubble);
      });
      this.points += 1 * this.multiplier;
      this.eliminateIslands(islandTesters);
      this.adjustColorOptions();
    }
  }, {
    key: "evaluateCollision",
    value: function evaluateCollision(newBubble) {
      var _this10 = this;

      var contacted = [];
      this.allBubbles.forEach(function (oldBubble) {
        if (_this10.inContactPop(oldBubble, newBubble)) {
          contacted.push(oldBubble);
        }
      });
      var sameColor = contacted.filter(function (bub) {
        return bub.color === newBubble.color;
      });

      if (sameColor.length > 1) {
        sameColor.forEach(function (bub) {
          bub.touching.push(newBubble);
          newBubble.touching.push(bub);
        });
        this.allBubbles.push(newBubble);
        this.eliminateColorTree(newBubble);
      } else if (sameColor.length === 1 && this.isTouchingOwnColor(sameColor[0])) {
        this.eliminateColorTree(sameColor[0]);
      } else {
        contacted.forEach(function (bub) {
          bub.touching.push(newBubble);
          newBubble.touching.push(bub);
        });
        this.allBubbles.push(newBubble);
        this.misses -= 1;
      }
    }
  }, {
    key: "mousePosition",
    value: function mousePosition(e) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  }, {
    key: "renderShootAssist",
    value: function renderShootAssist(e) {
      if (this.readyBubble) {
        mousePos = this.mousePosition(e);
        denominator = Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y);

        var _w = 10 * (mousePos.x / denominator);

        var _h = 10 * (mousePos.y / denominator);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.reRender();
        this.readyBubble.render();
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 14);
        this.ctx.lineTo(mousePos.x, mousePos.y);
        this.ctx.stroke();
      }
    }
  }, {
    key: "dibujar",
    value: function dibujar() {
      this.reRender();
      this.movingBubble(this.activeBubble);
    }
  }, {
    key: "fireBubble",
    value: function fireBubble(e) {
      if (this.readyBubble) {
        this.activeBubble = this.readyBubble;
        this.readyBubble = null;
        mousePos = this.mousePosition(e);
        w = mousePos.x - this.canvas.width / 2;
        h = mousePos.y;
        denominator = Math.sqrt(w * w + h * h);
        this.activeBubble.dx = 4 * (w / denominator);
        this.activeBubble.dy = 4 * (h / denominator);
        this.testNum += 1;
        clearInterval(this.interval);
        this.interval = setInterval(this.dibujar.bind(this), 1);
      }
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),

/***/ "./lib/game_over.js":
/*!**************************!*\
  !*** ./lib/game_over.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = __webpack_require__(/*! ./game */ "./lib/game.js");

var GameOver =
/*#__PURE__*/
function () {
  function GameOver(game) {
    _classCallCheck(this, GameOver);

    this.game = game;
    this.canvas = game.canvas;
    this.ctx = game.ctx;
    this.renderScreen();
  }

  _createClass(GameOver, [{
    key: "renderScreen",
    value: function renderScreen() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.game.renderAllBubbles();
      this.game.renderLine();
      this.ctx.font = '41px s';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText("game over", 170, 141);
      this.ctx.fillText("final score: ".concat(this.game.points), 150, 200);
      this.ctx.font = '20px Papyrus';
      this.ctx.fillText('Push space to play again', 159, 400);
    }
  }]);

  return GameOver;
}();

module.exports = GameOver;

/***/ }),

/***/ "./lib/opening_message.js":
/*!********************************!*\
  !*** ./lib/opening_message.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var openingMessage = function openingMessage(canvas, ctx) {
  ctx.fillStyle = "#3BD8CE";
  ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
  ctx.stroke();
  ctx.font = '41px serif';
  ctx.fillStyle = 'black';
  ctx.fillText("Uncle Spinney Dervish", 71, 41);
  ctx.fillStyle = 'white';
  ctx.font = '20px serif';
  ctx.fillText("Welcome to U.S.D.", canvas.width / 4 + 50, canvas.height / 4 + 30);
  ctx.font = '18px serif';
  ctx.fillText("The rules are simple:", canvas.width / 4 + 10, canvas.height / 4 + 70, canvas.width / 2 - 20);
  ctx.font = '16px serif';
  ctx.fillText("Click to fire a bubble.", canvas.width / 4 + 10, canvas.height / 4 + 100, canvas.width / 2 - 20);
  ctx.fillText("Connect three or more bubbles of the", canvas.width / 4 + 10, canvas.height / 4 + 130, canvas.width / 2 - 20);
  ctx.fillText("same color to pop them (Bouncing off", canvas.width / 4 + 10, canvas.height / 4 + 160, canvas.width / 2 - 20);
  ctx.fillText("walls is encouraged). If the main", canvas.width / 4 + 10, canvas.height / 4 + 190, canvas.width / 2 - 20);
  ctx.fillText("bubble blob hits a wall you lose.", canvas.width / 4 + 10, canvas.height / 4 + 220, canvas.width / 2 - 20);
  ctx.fillText("Press any key to begin", canvas.width / 4 + 41, canvas.height / 4 + 270, canvas.width / 2 - 20);
};

module.exports = openingMessage;

/***/ }),

/***/ "./lib/spinney.js":
/*!************************!*\
  !*** ./lib/spinney.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Spinney =
/*#__PURE__*/
function () {
  function Spinney(canvas, ctx, impactBubble, initialPos, bubblesArray, prev) {
    _classCallCheck(this, Spinney);

    this.canvas = canvas;
    this.ctx = ctx;
    this.incDx = impactBubble.dx;
    this.incDy = impactBubble.dy;
    this.centerX = 263;
    this.centerY = 320;
    this.bubbles = bubblesArray;
    this.c = null;
    this.prevPos = this.adjustments(prev.x, prev.y);
    this.initialPos = this.adjustments(initialPos.x, initialPos.y);
    this.impactBubble = this.adjustments(impactBubble.x, impactBubble.y);
    this.adjustConstant();
  }

  _createClass(Spinney, [{
    key: "adjustments",
    value: function adjustments(x, y) {
      var adjX = x - this.centerX;
      var adjY = y - this.centerY;
      return {
        x: adjX,
        y: adjY
      };
    }
  }, {
    key: "findChange",
    value: function findChange(bubble) {
      var justments = this.adjustments(bubble.x, bubble.y);
      var r = Math.sqrt(justments.x * justments.x + justments.y * justments.y);
      var thetaO = this.c + Math.atan(justments.y / justments.x);
      return {
        x: Math.cos(thetaO) * r,
        y: Math.sin(thetaO) * r
      };
    }
  }, {
    key: "radToDeg",
    value: function radToDeg(ang) {
      return ang * 180 / Math.PI;
    }
  }, {
    key: "movingAway",
    value: function movingAway() {
      var current = this.impactBubble;
      var prev = this.prevPos;
      var currentLength = Math.sqrt(current.x * current.x + current.y * current.y);
      var prevLength = Math.sqrt(prev.x * prev.x + prev.y * prev.y);
      return prevLength < currentLength;
    }
  }, {
    key: "oppositeSign",
    value: function oppositeSign(a, b) {
      if (a < 0 && b > 0) {
        return true;
      } else if (a > 0 && b < 0) {
        return true;
      }

      return false;
    }
  }, {
    key: "findImpactAngle",
    value: function findImpactAngle() {
      var slopeA = (this.impactBubble.y - this.initialPos.y) / (this.impactBubble.x - this.initialPos.x);
      var slopeB = this.impactBubble.y / this.impactBubble.x;
      var tanAng = (slopeB - slopeA) / (1 + slopeB * slopeA);
      var rlAng = Math.atan(tanAng);
      var angleInDeg = this.radToDeg(Math.atan(tanAng));

      if (!tanAng) {
        return 0;
      } else if (this.movingAway()) {
        // } else if (this.oppositeSign(slopeA, tanAng) && !this.oppositeSign(this.impactBubble.x, this.incDx)) {
        return -Math.atan(tanAng); // } else if (this.oppositeSign(slopeA, tanAng) && !this.oppositeSig n(this.impactBubble.y, this.incDy)) {
        //   return -Math.atan(tanAng);
      } else {
        return Math.atan(tanAng);
      }
    }
  }, {
    key: "adjustConstant",
    value: function adjustConstant() {
      var ang = this.findImpactAngle();
      this.c = 0.1 * Math.sin(ang);
    }
  }, {
    key: "iterateSpin",
    value: function iterateSpin() {
      var _this = this;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bubbles.forEach(function (bub) {
        if (bub.color !== 'silver') {
          var justments = _this.adjustments(bub.x, bub.y);

          var delta = _this.findChange(bub);

          if (justments.x >= 0 && justments.y >= 0) {
            bub.x = _this.centerX + delta.x;
            bub.y = _this.centerY + delta.y;
          } else if (justments.x < 0 && justments.y >= 0) {
            bub.x = _this.centerX - delta.x;
            bub.y = _this.centerY - delta.y;
          } else if (justments.x >= 0 && justments.y < 0) {
            bub.x = _this.centerX + delta.x;
            bub.y = _this.centerY + delta.y;
          } else if (justments.x < 0 && justments.y < 0) {
            bub.x = _this.centerX - delta.x;
            bub.y = _this.centerY - delta.y;
          }
        }
      });
      this.c *= 0.980;
    }
  }]);

  return Spinney;
}();

module.exports = Spinney;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map