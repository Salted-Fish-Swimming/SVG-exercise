import { S, svg } from "./svg.js"
import { vec } from "../3/vec.js"


export const render = (root) => {
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