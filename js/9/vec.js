import { Pi, cos, sin, range } from "../8/math.js";
import { curried2 } from "./utils.js";

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

export const vadd = curried2((a, b) => _zipfn(a, b, _add));
export const vadds = (...vects) => vects.reduce(vadd);
export const vladd = (...terms) => terms.map(([k, v]) => vtimes(k, v)).reduce(vadd);

export const vminus = curried2((a, b) => _zipfn(a, b, _minus));

export const vtimes = curried2((k, v) => v.map(x => k * x));

export const vdot = curried2((a, b) => _zipfn(a, b, _times).reduce(_add));

export const norm = (v) => Math.sqrt(vdot(v, v));

export const unif = (v) => vtimes(1 / norm(v), v);

export const unir = (t) => [ cos(t), sin(t) ];
export const unic = (n) => range(n).map(i => unir(i / n * 2 * Pi));


