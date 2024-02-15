import { S, renderSdom } from "../6/svg.js";
import { range } from "./math.js";
import { left, right, rotate2 } from "./matrix-util.js";
import { matrix } from "./matrix.js";
import { line, rect } from "./shape.js";
import { Pi, uc } from "./vec-util.js";
import { vec } from "./vec.js";

const viewBox = ({ width, height, pos }) => {
  const sizeVec = vec(width, height);
  const orgPos = pos.add(sizeVec.times(-0.5));
  const viewBox = `${orgPos.x} ${orgPos.y} ${width} ${height}`;

  return { width, height, viewBox };
}

const shaperender = shape => {
  console.log(shape);
  const kind = shape.type();
  if (kind === 'line') {
    return shape.sdom({
      stroke: {
        self: '#333', width: 7, linecap: 'round'
      }
    });
  } else if (kind === 'polyline' || kind === 'polygon') {
    return shape.sdom({
      fill: 'none',
      stroke: {
        self: '#333', width: 7,
        linecap: 'round', linejoin: 'round'
      }
    })
  }
}

const viewful = (root, size, render, shapes) => {
  const rootsdom = S('svg', {
    ...viewBox(size),
  }, shapes.map(render));

  return root.append(renderSdom(rootsdom));
}

const viewSize = rect(800, 800);

const shape1lines = (n, r) => {
  const points = uc(n).map(v => v.times(r));

  const lineful = (k, rate) => {
    const npos = points.map(vec.times(rate));
    return range(n).map(i => line(npos[i], npos[(i + k) % n]));
  }

  return [
    ...lineful(1, 1.17), ...lineful(2, 1.1), ...lineful(3, 1)
  ];
}

const shape2lines = (n, r, len) => {
  const points = uc(n).map(v => v.times(r));

  const lineful = (len) => {
    return points.map(p => line(p, p.times(1 + len / r)))
  }

  return [ ...lineful(len) ];
}

const shape3lines = (xline, width) => {
  const { start: s, end: e } = xline;
  const fw = e.minus(s);
  const vl = vec(-fw.y, fw.x).unif().times(width / 2);
  const vr = vec(fw.y, -fw.x).unif().times(width / 2);
  const lls = s.add(vl), lle = lls.add(fw);
  const rls = s.add(vr), rle = rls.add(fw);
  return [ line(lls, lle), line(rls, rle) ];
}

export const render = (root) => {
  const n = 9;
  return viewful(root, viewSize, shaperender, [
    ...shape1lines(n, 150),
    ...shape2lines(n, 50, 15),
    ...shape2lines(n, 95, 20)
      .flatMap(l => shape3lines(l, 10)),
    ...shape2lines(6, 190, 30)
      .flatMap(l => shape3lines(l, 40))
      .flatMap(l => shape3lines(l, 15)),
  ]);
}
