import { S, renderSdom } from "./svg.js";
import { cyc, isVec, pur, rotate, vec } from "./vec.js";

const viewport = vec(600, 500);
const center = viewport.times(0.5);
const centerlize = (v) => v.add(center);
const svgAttrs = {
  width: viewport.x, height: viewport.y,
};
const mix = (a, b) => ({ ...a, ...b });

const svg = (a, c) => S('svg', mix(a, svgAttrs), c);
const rect = (a) => S('rect', a, []);

export const render1 = (root) => {
  const rects = cyc(8).map(v => {
    const { x, y } = centerlize(v.times(100));
    return rect({ width: 50, height: 50, x, y });
  });
  const sdom = renderSdom(svg({}, [
    ...rects,
  ]));
  root.append(sdom);
};

const line = ({ p1, p2, ...others }) => S('line', {
  x1: p1.x, y1: p1.y,
  x2: p2.x, y2: p2.y,
  stroke: {
    self: '#333',
    width: 40,
    linecap: 'round',
  },
  ...others
}, []);

export const render = (root) => {
  const lines = cyc(11).map(v => {
    v = rotate(-0.25, v);
    const p1 = centerlize(v.times(100));
    const p2 = centerlize(v.times(200));
    return line({ p1, p2 });
  })
  lines[0].attrs.stroke = '#888';
  const sdom = renderSdom(svg({}, [
    ...lines,
  ]));
  root.append(sdom);
}