import { S, renderSdom } from "./svg.js";
import { cyc, vec, vec3 } from "./vec.js";
import { rotate, rotatex, rotatey, rotatez } from "./transform.js";
import { cubeEdges, projEdges } from "./cube.js";
import { anime } from "./anime.js";

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
    width: 15,
    linecap: 'round',
  },
  ...others
}, []);

export const render2 = (root) => {
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

export const render = (root) => {
  let angle = 0;
  let time = 0;
  const tf = v => {
    const nv1 = rotatey(0.13, v);
    const nv2 = rotatex(0.1, nv1);
    const nv3 = rotatez(0.1, nv2);
    const rv = rotatez(angle, nv3);
    const fv = rv.add(vec3(0, 0, 0.2 * Math.sin(time / 25)))
    return fv;
  };

  const getLines = () => {
    return projEdges(cubeEdges.map(([ v1, v2 ]) => {
      return [ tf(v1), tf(v2) ];
    })).map(([ v1, v2 ]) => {
      const p1 = centerlize(v1.times(600));
      const p2 = centerlize(v2.times(600));
      return line({ p1, p2 });
    }).map(renderSdom);
  }
  const sdom = renderSdom(svg({}, []));
  root.append(sdom);

  anime(next => {
    sdom.replaceChildren(...getLines());
    angle += 0.003;
    time += 1;
    next();
  });
}