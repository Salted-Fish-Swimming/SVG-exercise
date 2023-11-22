import { S, svg } from "./svg.js"
import { vec } from "../3/vec.js"

const e = (theta) => vec(Math.cos(theta), Math.sin(theta));
const epi = (x) => e(x * 2 * Maht.PI);

const rectful = vec => ({ width: vec.x, height: vec.y });

const renders = [];

renders[0] = (root) => {
  const viewSize = (unit => vec(4 * unit, 3 * unit))(100);
  const rectSize = vec(300, 200);
  const rectPos = viewSize.times(0.5).add(rectSize.times(-0.5));

  const rect = (p, v, others) => S.rect({
    x: p.x, y: p.y,
    width: v.x, height: v.y,
    ...others
  });

  root.append(S.render(svg({
    ...rectful(viewSize)
  }, [
    rect(rectPos, rectSize, {
      rx: 30, ry: 30, 'fill': 'transparent',
      'stroke': '#333333', 'stroke-width': 10
    }),
  ])));
};

renders[1] = (root) => {
  const viewSize = (unit => vec(5 * unit, 3 * unit))(100);

  root.append(S.render(svg({
    ...rectful(viewSize)
  }, [
    S.rect({
      x: 100, y: 100, width: 200, height: 150,
      rx: 25, ry: 25,
      fill: 'transparent',
      stroke: '#333333', 'stroke-width': 10,
    }),
    S.line({
      x1: 100, y1: 50, x2: 300, y2: 50,
      stroke: '#333333', 'stroke-width': 10,
    })
  ])))
},

renders[2] = (root) => {
  const viewSize = (unit => vec(5 * unit, 3 * unit))(100);

  root.append(S.renderDom(svg({
    ...rectful(viewSize),
  }, [
    S.path({ d: 'M 10 10 H 90 V 90 H 10 L 10 10' }),
  ])));
}


export const render = renders[2];

