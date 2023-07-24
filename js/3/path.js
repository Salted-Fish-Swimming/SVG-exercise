const PAC = {
  M: (x, y) => ({ action: 'M', x, y }), m: (dx, dy) => ({ action: 'm', dx, dy }),
  L: (x, y) => ({ action: 'L', x, y }), l: (dx, dy) => ({ action: 'l', dx, dy }),
  H: (x) => ({ action: 'H', x }), h: (x) => ({ action: 'h', dx }),
  V: (y) => ({ action: 'V', y }), v: (y) => ({ action: 'v', dy }),
};

const PA2STemplate = {
  M: ({ x, y }) => `M ${x} ${y}`, m: ({ dx, dy }) => `m ${dx} ${dy}`,
  L: ({ x, y }) => `L ${x} ${y}`, l: ({ dx, dy }) => `l ${dx} ${dy}`,
  H: ({ x }) => `H ${x}`, h: ({ dx }) => `h ${dx}`,
  V: ({ y }) => `V ${y}`, v: ({ dy }) => `v ${dy}`,
};

const PA2S = (pathAction) => {
  const { action } = pathAction;
  return PA2STemplate[action](pathAction);
}

export class Path {

  constructor(current, before = []) {
    this.current = current;
    this.before = before;
  }

  toArray() {
    return [ ...this.before, this.current ];
  }

  toString () {
    const beforeString = this.before.map(act => PA2S(act)).join(' ');
    if (beforeString == '') {
      return `${PA2S(this.current)}`;
    } else {
      return `${beforeString} ${PA2S(this.current)}`;
    }
  }

}

Object.assign(Path.prototype, {
  L (x, y) { return new Path(PAC.L(x, y), this.toArray()); },
  l (dx, dy) { return new Path(PAC.l(dx, dy), this.toArray()); },
  H (x) { return new Path(PAC.H(x), this.toArray()); },
  h (dx) { return new Path(PAC.h(dx), this.toArray()); },
  V (y) { return new Path(PAC.V(y), this.toArray()); },
  v (dy) { return new Path(PAC.v(dy), this.toArray()); },
});

export const path = Object.assign((x, y) => new Path(PAC.M(x, y)), {
  M: (x, y) => new Path(PAC.M(x, y)),
  m: (dx, dy) => new Path(PAC.m(x, y)),
});
