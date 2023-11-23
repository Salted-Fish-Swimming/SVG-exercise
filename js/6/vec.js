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

class Vector3D {

  constructor (x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }

  add (other) {
    return new Vector3D(
      this.x + other.x, this.y + other.y,
      this.z + other.z,
    );
  }

  times (k) {
    return new Vector3D(
      k * this.x, k * this.y, k * this.z
    );
  }

  *[Symbol.iterator] () {
    yield this.x;
    yield this.y;
    yield this.z;
  }

}

export const vec2 = (x, y) => new Vector2D(x, y);
export const vec3 = (x, y, z) => new Vector3D(x, y, z);
export const vec = vec2;
export const isVec2 = (v) => {
  return Object.getPrototypeOf(v) === Vector2D.prototype;
}
export const isVec3 = (v) => {
  return Object.getPrototypeOf(v) === Vector3D.prototype;
}
export const isVec = (v) => isVec2(v) || isVec3(v);

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
