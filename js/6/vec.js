class Vector2D {

  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  add (other) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  times (k) {
    return new Vector2D(this.x * k, this.y * k);
  }

  *[Symbol.iterator] () {
    yield this.x;
    yield this.y;
  }
}

export const vec2 = (x, y) => new Vector2D(x, y);
export const vec = vec2;
export const isVec = (v) => {
  return Object.getPrototypeOf(v) === Vector2D.prototype;
}

export const add = (v1, v2) => v1.add(v2);
export const times = (k, vec) => vec.times(k);

export const cyc = (n) => {
  const list = new Array(n).fill(0);
  return list.map((_, i) => vec(
    Math.cos(Math.PI * 2 * i / n),
    Math.sin(Math.PI * 2 * i / n)
  ));
}

export const pur = (k) => {
  return vec(
    Math.cos(Math.PI * 2 * k),
    Math.sin(Math.PI * 2 * k),
  );
}

export const rotate = (k, v) => {
  const { x: x1, y: y1 } = pur(k);
  const { x: x2, y: y2 } = v;
  return vec(
    x1 * x2 - y1 * y2,
    x1 * y2 + x2 * y1,
  );
}
