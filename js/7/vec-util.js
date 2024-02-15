import { range } from "./math.js";
import { vec } from "./vec.js";

export const Pi = Math.PI;

// unit root
export const ur = (alpha) => vec(Math.sin(alpha), Math.cos(alpha));

export const uc = (n) => range(n).map(i => ur(i / n * 2 * Pi));