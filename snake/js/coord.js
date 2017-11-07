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
