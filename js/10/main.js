import { S, renderSdom } from "../6/svg.js";
import { rect } from "../9/shape.js";
import { vadd } from "../9/vec.js";
import { renderSubSdoms } from "./logic-gate/main.js";

const viewBox = ({ width, height, origin }) => {
  const [ x, y ] = vadd(origin, [ -width / 2, -height / 2]);
  const viewBox = `${x} ${y} ${width} ${height}`;
  return { width, height, viewBox };
}

export const render = root => {
  const size = rect(500, 400);
  const sdom = S('svg', { ...viewBox(size) }, [
    ...renderSubSdoms(),
  ]);
  return root.append(renderSdom(sdom));
}