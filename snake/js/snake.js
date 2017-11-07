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
