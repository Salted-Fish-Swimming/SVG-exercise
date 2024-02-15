import { mdot, mtl, mtr } from "./matrix.js";
import { unif, vadd, vdot, vminus } from "./vec.js";

class Line {

  constructor (start, end) {
    this.s = start, this.e = end;
  }

  move (v) {
    return new Line(vadd(v, this.s), vadd(v, this.e));
  }

  forward () {
    return unif(vminus(this.e, this.s));
  }

  left () {
    return mdot(mtl, this.forward());
  }

  right () {
    return mdot(mtr, this.forward());
  }

  toAttrs () {
    const [ x1, y1 ] = this.s;
    const [ x2, y2 ] = this.e;
    return { x1, y1, x2, y2 };
  }

}

class Rect {

  constructor (width, height, origin) {
    this.width = width;
    this.height = height;
    this.origin = origin;
  }

  move (v) {
    return new Rect(this.width, this.height, vadd(v, this.origin));
  }

  toAttrs () {
    const { width, height, orign: [ x, y ] } = this;
    return { x, y, width, height, };
  }

}

export const line = (s, e) => new Line(s, e);
export const rect = (width, height, origin = [ 0, 0 ]) => new Rect(width, height, origin);