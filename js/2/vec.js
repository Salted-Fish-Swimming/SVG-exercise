export class Position {

  constructor (x, y) {
    this.x = x; this.y = y;
  }

  add (v2) {
    return new Position(this.x + v2.x, this.y + v2.y);
  }

  times (k) {
    return new Position(k * this.x, k * this.y)
  }

  map (key1, key2) {
    return { [key1]: this.x, [key2]: this.y }
  }
}

export const pos = (x, y) => new Position(x, y);

export const add = (v1, v2) => v1.add(v2);

export const times = (k, v1) => v1.times(k);