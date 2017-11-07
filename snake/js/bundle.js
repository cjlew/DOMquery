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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(1);

$( () => {
  const $rootEl = $('.snake-game');
  new View($rootEl);
});

console.log("A-OK!");


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);

class View {
  constructor($el) {
    this.el = $el;
    this.board = new Board();
    this.makeGrid();
    this.setSnake();
    this.setApple();
    this.intervalID = setInterval(this.step.bind(this), 200);
    $('body').on("keydown", (e) => {
      // debugger
      switch (e.keyCode) {
        case 37:
          this.board.snake.turn("W");
          break;
        case 38:
          this.board.snake.turn("N");
          break;
        case 39:
          this.board.snake.turn("E");
          break;
        case 40:
          this.board.snake.turn("S");
          break;
        default:
          console.log(e.keyCode);
          break;
      }
    });

  }

  setApple() {
    const appleLI = $(`li[data-pos="${this.board.apple}"]`);
    appleLI.toggleClass("apple empty");
  }

  setSnake() {
    const snakeStart = $(`li[data-pos="${this.board.snake.segments[0]}"]`);
    snakeStart.toggleClass("snake empty");
    // debugger
  }

  step() {
    // debugger;
    const tail = this.board.snake.move();
    const $newHeadLi = $(`li[data-pos="${this.board.snake.segments[0]}"]`);
    // console.log(`${$newHeadLi} - ${this.board.snake.segments[0]}`);
    // console.log(`apple - ${this.board.apple}`);
    if ($newHeadLi.hasClass("apple")) {
      this.board.snake.eatApple();
      const appleLI = $(`li[data-pos="${this.board.apple}"]`);
      appleLI.toggleClass("apple empty");
      this.board.makeApple();
      this.setApple();
    } else if (!$newHeadLi.hasClass("empty")) {
      clearInterval(this.intervalID);
      alert("you lose!");
    }

    $(`li[data-pos="${tail}"]`).toggleClass("snake empty");
    $newHeadLi.toggleClass("snake empty");
  }

  makeGrid() {
    const $grid = $("<ul>");
    $grid.addClass("grid");

    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 20; j++){
        const $square = $('<li>');
        $square.attr('data-pos', [i,j]);
        // debugger
        $square.addClass("empty");
        $grid.append($square);
      }
    }
    this.el.append($grid);
  }
}

module.exports = View;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Coord {
  plus(coord1, coord2) {
    return[coord1[0] + coord2[0], coord1[1] + coord2[1]];
  }

  equals(coord1, coord2) {
    return (coord1[0] === coord2[0] && coord1[1] === coord2[1]);
  }

  isOpposite(direction1, direction2) {
    switch (direction1) {
      case "N":
        return direction2 === "S";
      case "S":
        return direction2 === "N";
      case "E":
        return direction2 === "W";
      case "W":
        return direction2 === "E";
    }
  }
}

class Snake {
  constructor(direction, segments) {
    this.direction = direction;
    this.segments = segments;
    this.grow = 0;
  }

  directionCoords() {
    switch (this.direction) {
      case "N":
        return [-1, 0];
      case "S":
        return [1, 0];
      case "E":
        return [0, 1];
      case "W":
        return [0, -1];
    }

  }

  move() {
    // debugger
    let tail = [-1,-1];
    let newHead = Coord.prototype.plus(this.segments[0], this.directionCoords());
    if (this.grow > 0) {
      this.grow--;
    } else {
     tail = this.segments.pop();
    }
    this.segments.unshift(newHead);
    return tail;
  }

  eatApple() {
    this.grow += 3;
  }

  turn(direction) {
    if (!Coord.prototype.isOpposite(this.direction, direction)) {
      this.direction = direction;
    }
  }
}

class Board {
  constructor() {
    this.snake = new Snake("E", [[0,0]]);
    this.sideLength = 20;
    this.grid = new Array(20);
    this.makeApple();
  }

  makeApple(){
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * 20);
      y = Math.floor(Math.random() * 20);
    }
    while (this.snake.segments.includes([x,y]));
    // debugger
    this.apple = [x,y];
    console.log(`${this.apple} - ${this.snake.segments}`);
  }

}

module.exports = Board;


/***/ })
/******/ ]);