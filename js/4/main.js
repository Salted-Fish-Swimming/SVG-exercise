import { S, svg } from "./svg.js"
import { vec } from "../3/vec.js"
import { range } from "../2/iter.js"

export const render1 = (root) => {
  const viewSize = (size => vec(size, size))(400);
  const center = viewSize.times(0.5);
  const rectSize = vec(350, 250);

  root.append(S.render(svg({
    ...viewSize.map('width', 'height'),
    style: { background: '#f1f5f9' }
  }, [
    S.rect({
      ...center.add(rectSize.times(-0.5)).map('x', 'y'),
      ...rectSize.map('width', 'height'),
      fill: '#a1a5a9'
    }),
  ])));
}

const phase = (n) => {
  const rans = range(0, n).map(x => Math.PI * 2 * x / n);
  return rans.map(p => vec(Math.cos(p), Math.sin(p)));
}

export const render2 = (root) => {
  const viewSize = (size => vec(size, size))(400);
  const center = viewSize.times(0.5);
  const poss = phase(4).map(v => v.times(40).add(center));

  return root.append(S.render(svg({
    ...viewSize.map('width', 'height'),
  }, [
    ...poss.map(pos => S.circle({
      ...pos.map('cx', 'cy'),
      r: 5,
      fill: '#333333',
    })),
  ])));
}

export const render3 = (root) => {
  const viewSize = (size => vec(size, size))(400);
  // const center = viewSize.times(0.5);
  
  return root.append(S.render(svg({
    ...viewSize.map('width', 'height'),
    viewBox: '-50 -50 100 100'
  }, [
    S.circle({ cx: 0, cy: 0, r: 20, fill: '#333333' })
  ])));
}

const rectPos = ({ x, y }, { x: w, y: h }) => {
  return [ vec(x, y), vec(x + w, y), vec(x, y + h), vec(x + w, y + h) ];
}

const Line = (p1, p2, others) => S.line({
  x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
  ...others,
});

const PolyLine = (points, others) => S.polyline({
  points: points.map(p => `${p.x},${p.y}`).reduce((p, c) => `${p} ${c}`),
  ...others,
});

export const render4 = (root) => {
  const viewSize = (size => vec(size, size))(400);

  const rectSize = vec(300, 200);
  const rps =  rectPos(viewSize.times(0.5).add(rectSize.times(-0.5)), rectSize);

  const line = (p1, p2) => Line(p1, p2, { stroke: '#222222', 'stroke-width': 5 });

  return root.append(S.render(svg({
    ...viewSize.map('width', 'height'),
  }, [
    line(rps[0], rps[1]),
    line(rps[0], rps[2]),
    line(rps[1], rps[3]),
    line(rps[2], rps[3]),
  ])))
}

export const render5 = (root) => {
  const viewSize = (size => vec(size, size))(400);

  const rectSize = vec(300, 200);
  const [ p1, p2, p3, p4 ] =  rectPos(viewSize.times(0.5).add(rectSize.times(-0.5)), rectSize);

  const polyline = (...points) => PolyLine(points, {});

  return root.append(S.render(svg({
    ...viewSize.map('width', 'height'),
  }, [
    polyline(p1, p2, p4, p3),
  ])))
}

export const render6 = (root) => {
  const viewSize = (unit => vec(unit * 5, unit * 4))(120);
  const triangle = (p1, p2, p3, others = {}) => PolyLine([ p1, p2, p3 ], others);

  const tripos = phase(3).map(v => v.times(100).add(viewSize.times(0.5)));

  return root.append(S.render(svg({
    ...viewSize.map('width', 'height')
  }, [
    triangle(...tripos, {
      fill: '#f93',
    }),
  ])))

}

