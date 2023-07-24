import { svg, rect, circle, S } from '../1/svg.js';
import { range } from './iter.js';
import { pos } from './vec.js';

const viewSize = ((size) =>({
  width: size, height: size,
}))(400);

const center = pos(viewSize.width / 2, viewSize.height / 2);

const circlePoss = ((circleNums) => range(0, circleNums).map((i) => {
  const phaseR = Math.PI * 2 * i / circleNums;
  const phaseV = pos(Math.cos(phaseR), Math.sin(phaseR));
  return center.add(phaseV.times(120));
}))(12);

const g = (children) => S('g', {}, children);

export const render1 = (root) => {
  root.append(svg({ ...viewSize }, [
    ...circlePoss.map(pos => circle({ ...pos.map('cx', 'cy') , r: 12 , fill: 'black' }))
  ]));
}

export const render = (root) => {
  root.append(svg({ ...viewSize }, [
    g([
      ...circlePoss.map(pos => circle({ ...pos.map('cx', 'cy') , r: 12 , fill: 'black' }))
    ]),
    circle({ ...center.map('cx', 'cy'), r: 25, fill: '#333333' })
  ]));
}

export const render2 = (root) => {
  const rectSize = pos(20, 20);
  const centerSize = rectSize.times(3);

  root.append(svg({ ...viewSize }, [
    g([
      ...circlePoss.map(pos => rect({
        ...pos.add(rectSize.times(-0.5)).map('x', 'y'), // 让矩形居中
        ...rectSize.map('width', 'height'),
        fill: 'black'
      }))
    ]),
    rect({
      ...center.add(centerSize.times(-0.5)).map('x', 'y'),
      ...centerSize.map('width', 'height'),
      fill: '#333333'
    })
  ]));
}