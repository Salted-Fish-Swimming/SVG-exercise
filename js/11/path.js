const step = (seq, node) => new PathNodeSeq([ ...seq, node ]);

class PathCommandl {
  constructor ([dx, dy]) {
    this.dx = dx, this.dy = dy;
  }

  toStr () {
    return `l ${this.dx} ${this.dy}`;
  }
}

class PathCommandL {
  constructor ([x, y]) {
    this.x = x, this.y;
  }

  toStr () {
    return `L ${this.x} ${this.y}`;
  }
}

class PathCommandh {
  constructor (dx) {
    this.dx = dx;
  }

  toStr () {
    return `h ${this.dx}`;
  }
}

class PathCommandH {
  constructor (x) {
    this.x = x;
  }

  toStr () {
    return `H ${this.x}`;
  }
}

class PathCommandv {
  constructor (dy) {
    this.dy = dy;
  }

  toStr () {
    return `v ${this.dy}`;
  }
}

class PathCommandV {
  constructor (y) {
    this.y = y;
  }

  toStr () {
    return `V ${this.y}`;
  }
}

class PathCommandc {
  constructor (v1, v2, e) {
    this.v1 = v1, this.v2 = v2, this.e = e;
  }

  toStr () {
    const [dx1, dy1] = this.v1;
    const [dx2, dy2] = this.v2;
    const [dx, dy] = this.e;
    return `c ${dx1} ${dy1} ${dx2} ${dy2} ${dx} ${dy}`;
  }
}

class PathCommandC {
  constructor (p1, p2, e) {
    this.p1 = p1, this.p2 = p2, this.e = e;
  }

  toStr () {
    const [x1, y1] = this.p1;
    const [x2, y2] = this.p2;
    const [x, y] = this.e;
    return `C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
  }
}

class PathNodeSeq {
  constructor (nodes) {
    this.nodes = nodes;
  }

  l (v) {
    return step(this.nodes, new PathCommandl(v))
  }

  L (p) {
    return step(this.nodes, new PathCommandL(p));
  }

  h (dx) {
    return step(this.nodes, new PathCommandh(dx));
  }

  H (x) {
    return step(this.nodes, new PathCommandH(x));
  }

  v (dy) {
    return step(this.nodes, new PathCommandv(dy));
  }

  V (y) {
    return step(this.nodes, new PathCommandV(y));
  }

  c (v1, v2, e) {
    return step(this.nodes, new PathCommandc(v1, v2, e));
  }

  C (p1, p2, e) {
    return step(this.nodes, new PathCommandC(p1, p2, e));
  }

  s ([dx1, dy1], [dx, dy]) {
    return step(this.nodes, {
      type: 's', p1: [dx1, dy1],
      e: [dx, dy],
    });
  }

  z () {
    return step(this.nodes, { type: 'z' });
  }

  Z () {
    return step(this.nodes, { type: 'Z' });
  }
}

export const M = ([x, y]) => new PathNodeSeq(undefined, { type: 'M', x, y, args: [x, y]});
