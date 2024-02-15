import { matrix } from "./matrix.js";

const sin = Math.sin, cos = Math.cos;

export const rotate2 = (alpha) => matrix([ cos(alpha), -sin(alpha) ], [ sin(alpha), cos(alpha) ]);

export const left = matrix([ 0, 1 ], [ -1, 0 ]);

export const right = matrix([ 0, -1 ], [ 1, 0 ]);