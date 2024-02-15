class PathD {
  constructor (d) {
    this.d = d;
  }

  L ([x, y]) {
    return new PathD(`${this.d} L ${x} ${y}`);
  }

  LX (x) {
    return new PathD(`${this.d} H ${x}`);
  }

  LY (y) {
    return new PathD(`${this.d} V ${y}`)
  }

  A ([ rx, ry ], rotate, largeArc, sweep, [ x, y ]) {
    return new PathD( `${this.d} A ${rx} ${ry} ${rotate} ${largeArc} ${sweep} ${x} ${y}`);
  }

  Z () {
    return `${this.d} Z`;
  }

}

export const M = ([x, y]) => new PathD(`M ${x} ${y}`); 