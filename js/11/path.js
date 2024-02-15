class PathNodeSeq {
  constructor (pre, node) {
    this.pre = pre, this.cur = node;
  }

  L ([x, y]) {
    return new PathNodeSeq(this, { type: 'L', x, y });
  }
}

const toStr = ({ pre, cur }) => {
  return `${toStr(pre)}`;
}
