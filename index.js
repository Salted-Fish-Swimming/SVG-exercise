import { dec, decNS } from "./js/dec.js"

const div = (a, c) => dec('div', a, c);
const SVG = (n, a, c) => decNS('http://www.w3.org/2000/svg', n, a, c);
const svg = (a, c) => SVG('svg', a, c);
const rect = (a) => SVG('rect', a, []);

const s = svg({ width: '150', height: '100', viewBox: '0 0 3 2' } ,[
  rect({ width: '1', height: '2', x: '0', fill: '#008d46' }),
  rect({ width: '1', height: '2', x: '1', fill: '#ffffff' }),
  rect({ width: '1', height: '2', x: '2', fill: '#d2232c' }),
]);

document.body.append(s);
