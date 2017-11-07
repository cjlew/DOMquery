const Board = require("./snake.js");

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
