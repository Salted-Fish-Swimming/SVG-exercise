import { vadd, vadds, vtimes } from "../9/vec.js";

const halfv = v => vtimes(1/2, v);
const mhalfv = v => vtimes(-1/2, v);

class Rect {

  constructor (pos, width, height) {
    this.pos = pos, this.width = width, this.height = height;
  }

  get lt () {
    return vadds(this.pos, mhalfv(this.width), mhalfv(this.height));
  }

  get lb () {
    return vadds(this.pos, mhalfv(this.width), halfv(this.height));
  }

  get rt () {
    return vadds(this.pos, halfv(this.width), mhalfv(this.height));
  }

  get rb () {
    return vadds(this.pos, halfv(this.width), halfv(this.height));
  }

}

class Line {
  constructor (s, e) {
    this.s = s, this.e = e;
  }
}

export const rect = (org, wv, hv) => new Rect(org, wv, hv);