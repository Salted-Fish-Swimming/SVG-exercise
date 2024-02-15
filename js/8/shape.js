import { vec } from "./vec.js";

class Line {
  constructor (start, end) {
    this.start = start, this.end = end;
  }

  move (v) {
    return new Line(vec.add(this.start, v), vec.add(this.end, v));
  }

  toAttrs () {
    const [ x1, y1 ] = this.start;
    const [ x2, y2 ] = this.end;
    return { x1, x2, y1, y2 };
  }
}

class Rect {
  constructor (width, height, origin) {
    this.width = width;
    this.height = height;
    this.origin = origin;
  }

  move (v) {
    return new Rect(this.width, this.height, vec.add(this.orign, v));
  }

  toAttrs () {
    const { width, height, orign: [ x, y ] } = this;
    return { x, y, width, height, };
  }
}

export const line = (start, end) => new Line(start, end);
export const rect = (width, height, origin = [ 0, 0 ]) => new Rect(width, height, origin);