import { vadd, vadds, vdot, vminus, vtimes } from "../../9/vec.js";
import { M } from "../path.js";

export const tl = ([ x, y ]) => [ y, -x ];
export const tr = ([ x, y ]) => [ -y, x ];

export const basel = x => x * 40;
export const basex = k => [ basel(k), 0 ];
export const basey = k => [ 0, basel(k) ];

const proj = (s, d) => vtimes(vdot(s, d)/vdot(d, d), d);
const minusv = v => vtimes(-1, v);
const center = (v1, v2) => vadd(vtimes(1/2, v1), vtimes(1/2, v2));

export const GridCoord = (gx, gy) => [ basel(gx), basel(gy) ];

export const xlTo = (x, [ px, py ]) => [ x, py ];

export const ylTo = (y, [ px, py ]) => [ px, y ];

export const connect = ([ sv, sp ], [ ev, ep ]) => {
  if (vdot(sv, ev) > 0) {
    const cmpv = center(sv, ev);
    console.log(vminus(ep, sp), cmpv);
    const extv = vtimes(1/2, proj(vminus(ep, sp), cmpv));
    const a = vadds(sp, extv, cmpv);
    const b = vadds(ep, minusv(extv), cmpv);
    return M(sp).L(a).L(b).L(ep).d;
  }
}