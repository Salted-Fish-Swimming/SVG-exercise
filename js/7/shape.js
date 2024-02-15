import { S } from "../6/svg.js";
import { vec } from "./vec.js";

class Line {
  constructor (startPoint, endPoint) {
    this.start = startPoint;
    this.end = endPoint;
  }

  type () {
    return 'line';
  }

  sdom (attrs) {
    return S('line', {
      x1: this.start.x, x2: this.end.x,
      y1: this.start.y, y2: this.end.y,
      ...attrs,
    }, []);
  }
}

class PolyLine {
  constructor (points) {
    this.points = points
  }

  type () {
    return 'polyline';
  }

  sdom (attrs) {
    const points = this.points
      .map(p => `${p.x},${p.y}`)
      .join(' ');
    return S('polyline', {
      points, ...attrs,
    }, [])
  }
}

class Polygon {
  constructor (points) {
    this.points = points
  }

  type () {
    return 'polygon'
  }

  sdom (attrs) {
    const points = this.points
      .map(p => `${p.x},${p.y}`)
      .join(' ');
    return S('polygon', {
      points, ...attrs,
    }, [])
  }
}

class Rect {
  constructor (origin, width, height) {
    this.pos = origin;
    this.width = width;
    this.height = height;
  }

  origin (pos) {
    return new Rect(pos, this.width, this.height);
  }

  type () {
    return 'rect';
  }

  sdom (attrs) {
    const { width, height, pos: { x, y } } = this;
    return S('rect', {
      x, y, width, height,
      ...attrs
    });
  }

}

export const line = (a, b) => new Line(a, b);
export const rect = (width, height) => new Rect(vec(0, 0), width, height);