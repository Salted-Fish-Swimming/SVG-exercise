class Vector2 {
  constructor (x, y) {
    this.x = x; this.y = y;
  }

  add (v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  minus (v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  dot (v) {
    return this.x * v.x + this.y * v.y;
  }

  times (n) {
    return new Vector2(n * this.x, n * this.y);
  }

  unif () {
    const norm = Math.sqrt(this.dot(this));
    return this.times(1 / norm);
  }
}

class Vector3 {
  constructor (x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }

  add (v) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  minus (v) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  dot (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  times (n) {
    return new Vector3(n * this.x, n * this.y, n * this.z);
  }

  unif () {
    const norm = Math.sqrt(this.dot(this));
    return this.times(1 / norm);
  }
}

class Vector {
  constructor (values) {
    this.xs = values;
  }

  add (v) {
    return new Vector(_zip(this.xs, v.xs, _add));
  }

  minus (v) {
    return new Vector(_zip(this.xs, v.xs, _minus));
  }

  dot (v) {
    return _zip(this.xs, v.xs, _times).reduce(_add);
  }

  times (n) {
    return new Vector(this.xs.map(v => n * v));
  }

  unif () {
    const norm = Math.sqrt(this.dot(this));
    return this.times(1 / norm);
  }
}

const _zip = (a, b, fn) => {
  if (a.length === b.length) {
    const c = [];
    for (let i = 0; i < a.length; i ++) {
      c[i] = fn(a[i], b[i]);
    }
    return c;
  } else {
    throw new Error('vector lengths are not equal');
  }
}

const _add = (a, b) => a + b;
const _minus = (a, b) => a - b;
const _times = (a, b) => a * b;

const vec = (...args) => {
  if (args.length === 2) {
    return new Vector2(...args);
  } else if (args.length === 3) {
    return new Vector3(...args);
  } else {
    return new Vector(args);
  }
}

Object.assign(vec, {
  add: v => x => x.add(v),
  minus: v => x => x.minus(v),
  dot: v => x => x.dot(v),
  times: k => x => x.times(k),
});

export const pos = vec;
export { vec };