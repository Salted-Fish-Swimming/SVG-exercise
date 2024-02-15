import { S } from "../../6/svg.js";

export const path = d => S('path', {
  stroke: {
    self: 'black',
    linecap: 'round',
    linejoin: 'round',
    width: 4,
  },
  fill: 'none', d,
});

export const circle = (r, cx, cy) => S('circle', {
  r, cx, cy,
  stroke: {
    self: 'black',
    linejoin: 'round',
    width: 4,
  },
  fill: 'none',
});

export const point = (x, y) => S('circle', {
  r: 5, cx: x, cy: y,
  stroke: 'none',
  fill: 'black',
});

export const g = (attrs, children) => S('g', attrs, children);