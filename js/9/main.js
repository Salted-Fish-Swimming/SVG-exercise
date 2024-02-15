import { S, renderSdom } from "../6/svg.js";
import { line, rect } from "../9/shape.js";
import { unic, unif, vadd, vdot, vtimes } from "./vec.js";

const viewBox = ({ width, height, origin }) => {
  const [ x, y ] = vadd(origin, [ -width / 2, -height / 2]);
  const viewBox = `${x} ${y} ${width} ${height}`;
  return { width, height, viewBox };
}

const ucl = (n, r) => unic(n).map(vtimes(r));

const trg = (l) => {
  const p1 = vadd(l.s, vtimes(30, l.forward()));
  const p2 = vadd(l.s, vtimes(10, l.left()));
  const p3 = vadd(l.s, vtimes(40, l.right()));

  return [ line(p1, p2), line(p2, p3), line(p3, p1) ];
};

const shape = (n, r) => {
  const lins = ucl(n, r).map(p => {
    const s = p; const e = vadd(s, vtimes(50, unif(s)));
    return line(s, e);
  });
  console.log(lins.map(l => console.log(l)));
  return lins.flatMap(trg);
}

export const render = (root) => {
  const size = rect(600, 500);
  const lines = shape(6, 100);
  const sdom = S('svg', { ...viewBox(size) }, [
    ...lines.map(l => S('line', {
      ...l.toAttrs(),
      stroke: {
        self: '#333', width: 5, linecap: 'round'
      }
    }))
  ]);
  return root.append(renderSdom(sdom));
};
