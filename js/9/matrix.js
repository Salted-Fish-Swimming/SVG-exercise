import { cos, range } from "../8/math.js";
import { curried2 } from "./utils.js";
import { vdot } from "./vec.js";

class Matrix {
  constructor (rows) {
    this.rows = rows;
  }

  cols () {
    const len = this.rows[0].length;
    return range(len).map(i => this.rows.map(r => r[i]));
  }

  T () {
    return new Matrix(this.cols());
  }
}

const isMatrix = (rows) => {
  const len = rows[0].length;
  return rows.every(r => r.length === len);
}

export const mat = (...rows) => {
  if (rows.length === 0) {
    throw new Error('matrix must have least one element');
  } else if (isMatrix(rows)) {
    return new Matrix(rows);
  } else {
    throw new Error('matrix rows length must be equal');
  }
}

export const mtimes = curried2((a, b) => {
  const Ar = A.rows, Bc = B.cols();
  const rows = Ar.map(r => Bc.map(c => vdot(r, c)));
  return new Matrix(rows);
});

export const mdot = curried2((A, x) => {
  const Ar = A.rows;
  return Ar.map(r => vdot(r, x));
});

export const mtl = mat(
  [  0, 1 ],
  [ -1, 0 ]
);
export const mtr = mat(
  [ 0, -1 ],
  [ 1,  0 ]
);
export const mr2d = a => mat(
  [ cos(a), -sin(a) ],
  [ sin(a),  cos(a) ]
);
export const mrx = a => mat(
  [ 1,      0,       0 ],
  [ 0, cos(a), -sin(a) ],
  [ 0, sin(a),  cos(a) ]
);
export const mry = (a) => mat(
  [  cos(a), 0, sin(a) ],
  [       0, 1,      0 ],
  [ -sin(a), 0, cos(a) ]
);
export const mrz = (a) => mat(
  [ cos(a), -sin(a), 0 ],
  [ sin(a),  cos(a), 0 ],
  [      0,       0, 1 ],
);
