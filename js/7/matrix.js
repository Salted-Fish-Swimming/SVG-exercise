import { vec } from "./vec.js";
import { range } from './math.js';

const isSquareMatrix = (rows) => {
  const len = rows.length;
  return rows.every(r => r.length === len);
}

const msize = m => m.rows.length;
const vecful = rows => rows.map(row => vec(...row));

class Matrix2 {
  constructor (rows) {
    this.rows = rows;
  }

  times (m) {
    if (msize(this) === msize(m)) {
      const cols = m.T().rows;
      return new Matrix2(vecful(this.rows).map(r => vecful(cols).map(c => r.dot(c))));
    } else {
      throw new Error('matrix size is mismatch');
    }
  }

  dot (v) {
    if (v.length !== this.rows.length) {
      throw new Error('vector dimension and matrix dimension is mismatch');
    }
    return vec(...vecful(this.rows).map(r => r.dot(v)));
  }

  T () {
    return new Matrix2(range(2).map(i => this.rows.map(r => r[i])));
  }

}

export const matrix = (...rows) => {
  if (isSquareMatrix(rows)) {
    const n = rows.length;
    if (n == 2) {
      return new Matrix2(rows);
    }
  } else {
    throw new Error('is not square matrix');
  }
}