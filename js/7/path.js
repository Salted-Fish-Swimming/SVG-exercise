import { isVec, vec } from "./vec.js";

const mak2 = (a, p, x) => {
  p = isVec(p) ? p : vec(p, x);
  return { a, p };
}

const x = x => ({ x });
const y = y => ({ y });

class Path {

  constructor () {
    this.path = [];
  }

  M (p, x) {
    this.path.push(mak2('M', p, x));
    return this;
  }

  m (p, x) {
    this.path.push(mak2('m', p, x));
    return this;
  }

  L (p, x) {
    this.path.push(mak2('L', p, x));
    return this;
  }

  l (p, x) {
    this.path.push(mak2('l', p, x));
    return this;
  }

  H (x) {
    this.path.push({ a: 'H', x });
  }

}


