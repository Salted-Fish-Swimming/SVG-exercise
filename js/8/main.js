import { S, renderSdom } from "../6/svg.js";
import { line, rect } from "./shape.js";
import { vec, unic } from "./vec.js";
import { mat, rotate2, tleft } from './matrix.js';
import { Pi } from "./math.js";

const viewBox = ({ width, height, origin }) => {
  const [ x, y ] = vec.add(origin, [ -width / 2, -height / 2]);
  const viewBox = `${x} ${y} ${width} ${height}`;
  return { width, height, viewBox };
}

const lineful = (sline) => S('line', {
  ...sline.toAttrs(),
  stroke: {
    self: '#333', width: 5, linecap: 'round'
  }
});

const unicp = (n, r, a = 0) => unic(n)
  .map(v => vec.times(r, v))
  .map(p => mat.dot(rotate2(a), p));

const shape1 = (points) => {
  const unif = vec.unif;
  const lv = (p) => mat.dot(tleft, unif(p));
  const step = p => {
    const uv = unif(p);
    const ev = vec.add(p, vec.times(80, uv));
    const lvp = lv(p);
    const l = line(p, ev);
    return [
      l.move(vec.times(140, lvp)),
      l.move(vec.times(160, lvp))
    ];
  };
  return points.flatMap(step);
}

export const render = (root) => {
  const size = rect(800, 600);
  const n = 9, r = 60;
  const shapes = [
    ...shape1(unicp(n, r))
  ];
  const rootSdom = S('svg', { ...viewBox(size) }, [
    ...shapes.map(lineful),
  ]);

  return root.append(renderSdom(rootSdom));
}