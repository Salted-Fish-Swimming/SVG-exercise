import { range, Pi, sin, cos } from "./math.js";

const _add = (a, b) => a + b;
const _minus = (a, b) => a - b;
const _times = (a, b) => a * b;
const _zipfn = (v1, v2, fn) => {
  if (v1.length === v2.length) {
    return range(v1.length).map(i => fn(v1[i], v2[i]));
  } else {
    throw new Error('vector dimension mismatch');
  }
}

export const vec = {
  add: (v1, v2) => _zipfn(v1, v2, _add),
  minus: (v1, v2) => _zipfn(v1, v2, _minus),
  times: (k, v) => v.map(x => k * x),
  dot: (v1, v2) => _zipfn(v1, v2, _times).reduce(_add),
  unif: (v) => {
    const norm = Math.sqrt(vec.dot(v, v));
    return vec.times(1 / norm, v);
  }
}

export const unir = (alpha) => [ cos(alpha), sin(alpha) ];
export const unic = (n) => range(n).map(i => unir(Pi * 2 * i / n));
