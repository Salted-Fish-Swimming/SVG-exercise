import { svg, rect } from './svg.js';

const render = (dom) => {
  dom.append(svg({ width: '540', height: '360', viewBox: '0 0 3 2' }, [
    rect({ width: '1', height: '2', x: '0', fill: '#008d46' }),
    rect({ width: '1', height: '2', x: '1', fill: '#ffffff' }),
    rect({ width: '1', height: '2', x: '2', fill: '#d2232c' }),
  ]));
}

export { render };