import { pur, vec, vec3 } from "./vec.js";

export const rotate = (k, v) => {
  const { x: x1, y: y1 } = pur(k);
  const { x: x2, y: y2 } = v;
  return vec(
    x1 * x2 - y1 * y2,
    x1 * y2 + x2 * y1,
  );
}

export const rotatex = (k, v) => {
  const { x: x1, y: y1 } = pur(k);
  const { y: x2, z: y2 } = v;
  return vec3(
    v.x,
    x1 * x2 - y1 * y2,
    x1 * y2 + x2 * y1,
  );
}

export const rotatey = (k, v) => {
  const { x: x1, y: y1 } = pur(k);
  const { x: x2, z: y2 } = v;
  return vec3(
    x1 * x2 - y1 * y2,
    v.y,
    x1 * y2 + x2 * y1,
  );
}

export const rotatez = (k, v) => {
  const { x: x1, y: y1 } = pur(k);
  const { x: x2, y: y2 } = v;
  return vec3(
    x1 * x2 - y1 * y2,
    x1 * y2 + x2 * y1,
    v.z,
  );
}