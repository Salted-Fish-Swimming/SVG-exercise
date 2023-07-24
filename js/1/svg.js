import { decNS } from "./dec.js";

const S = (name, attributes, children) => decNS('http://www.w3.org/2000/svg', name, attributes, children);
const svg = (attributes, children) => S('svg', attributes, children);

const rect = (attributes, children = []) => S('rect', attributes, children);
const circle = (attributes, children = []) => S('circle', attributes, children);
const polyline = (attributes, children = []) => S('polyline', attributes, children);
const polygon = (attributes, children = []) => S('polygon', attributes, children);

export {
  S, svg, rect, circle, polyline, polygon,
}