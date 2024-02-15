import { range, sin, cos } from "./math.js";
import { vec } from "./vec.js";

class Matrix {
  constructor (rows) {
    this.rows = rows;
  }

  cols () {
    const colnum = this.rows[0].length;
    return range(colnum).map(i => this.rows.map(r => r[i]));
  }

  T () {
    return new Matrix(this.cols());
  }

}

const isMatrix = (rows) => {
  const len = rows.length;
  return rows.every(r => r.length === len);
}

export const matrix = (...rows) => {
  if (rows.length === 0) {
    throw new Error('matrix must have least one element');
  } else if (isMatrix(rows)) {
    return new Matrix(rows);
  } else {
    throw new Error('matrix rows length must be equal');
  }
}

export const mat = {
  times (A, B) {
    const Ar = A.rows, Bc = B.cols();
    const rows = Ar.map(r => Bc.map(c => vec.dot(r, c)));
    return new Matrix(rows);
  },
  dot (A, v) {
    const Ar = A.rows;
    return Ar.map(r => vec.dot(r, v));
  },
}

export const rotate2 = (alpha) => matrix(
  [ cos(alpha), -sin(alpha) ],
  [ sin(alpha),  cos(alpha) ]
);

export const tleft = matrix(
  [  0, 1 ],
  [ -1, 0 ]
);

export const tright = matrix(
  [ 0, -1 ],
  [ 1,  0 ]
);

export const rotateX = (alpha) => matrix(
  [ 1,          0,           0 ],
  [ 0, cos(alpha), -sin(alpha) ],
  [ 0, sin(alpha),  cos(alpha) ]
);

export const rotateY = (alpha) => matrix(
  [  cos(alpha), 0, sin(alpha) ],
  [           0, 1,          0 ],
  [ -sin(alpha), 0, cos(alpha) ]
);

export const rotateZ = (alpha) => matrix(
  [ cos(alpha), -sin(alpha), 0 ],
  [ sin(alpha),  cos(alpha), 0 ],
  [          0,           0, 1 ],
);
