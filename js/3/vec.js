class Vector2D {

  constructor (x, y) {
    this.x = x; this.y = y;
  }

  add (other) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  times (k) {
    return new Vector2D(k * this.x, k * this.y);
  }

  map (key1, key2) {
    return { [key1]: this.x, [key2]: this.y };
  }

}

class Vector3D {

  constructor (x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }

  add (other) {
    return new Vector3D(
      this.x + other.x, this.y + other.y, this.z + other.z
    );
  }

  times (k) {
    return new Vector3D(k * this.x, k * this.y, k * this.z);
  }

  map (key1, key2, key3) {
    return { [key1]: this.x, [key2]: this.y, [key3]: this.z };
  }

}


export const vec2 = (x, y) => new Vector2D(x, y);
export const vec3 = (x, y) => new Vector3D(x, y);

export const add = (v1, v2) => v1.add(v2);
export const times = (k, vec) => vec.times(k);

export const vec = vec2;
export const pos = vec;