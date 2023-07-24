import { circle, rect, svg } from "./svg.js";
import { vec } from "./vec.js";
import { path } from "./path.js";

export const render1 = (root) => {
  const viewSize = ((size) => vec(size, size))(500);
  const center = viewSize.times(0.5);
  const rectSize = vec(300, 250)

  root.append(svg({
    ...viewSize.map('width', 'height'),
    style: 'background: #343536',
  }, [
    rect({
      ...center.add(vec(-30, -25)).add(rectSize.times(-0.5)).map('x', 'y'),
      ...rectSize.map('width', 'height'),
      rx: 12, ry: 12, fill: '#3344ee'
    }),
    rect({
      ...center.add(vec(+20, +30)).add(rectSize.times(-0.5)).map('x', 'y'),
      ...rectSize.map('width', 'height'),
      rx: 12, ry: 12, fill: '#f3f4f5'
    }),
  ]));
}

export const render = (root) => {
  const viewSize = ((size) => vec(size, size))(500);

  root.append(svg({
    ...viewSize.map('width', 'height'),
    style: { background: '#e1e5e9' },
  }, [
    path(50, 50).H(450).V(450).H(50).L(50, 50),
    circle({ cx: 50, cy: 50, r: 10, fill: "red" }),
    circle({ cx: 50, cy: 450, r: 10, fill: "red" }),
    circle({ cx: 450, cy: 450, r: 10, fill: "red" }),
    circle({ cx: 450, cy: 50, r: 10, fill: "red" }),
  ]));
}

