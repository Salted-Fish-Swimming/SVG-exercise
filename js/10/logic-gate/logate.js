import { vadd, vadds, vdot, vminus, vtimes } from "../../9/vec.js";
import { M } from "../path.js";
import { rect } from "../shape.js";
import { basel, tr } from "./coord.js";
import { circle, g, path } from "./sdom.js";

const vaddl = (...terms) => vadds(...terms.map(([k, v]) => vtimes(k, v)));
const center = (v1, v2) => vaddl([ 1/2, v1 ], [ 1/2, v2 ]);

const gaterect = (p, v) => rect(p, v, tr(v));

export const NotGate = (p, v) => {
  const grect = gaterect(p, vtimes(3/4, v));

  const p1 = grect.lt, p2 = grect.lb;
  const p3 = center(grect.rt, grect.rb);

  const cr = basel(1/7);
  const cp = vadd(p3, vtimes(cr / basel(1), v));

  const sdom = g({ class: 'not-gate' }, [
    path(M(p1).L(p2).L(p3).Z()),
    circle(cr, ...cp),
  ]);
  return {
    sdom,
    in: center(p1, p2),
    out: vadd(cp, vtimes(cr / basel(1), v)),
  };
}

export const AndGate = (p, v) => {
  const r = basel(1/2);
  const grect = gaterect(p, v);

  const p1 = grect.lt, p2 = grect.lb;
  const p3 = center(grect.lb, grect.rb);
  const p4 = center(grect.lt, grect.rt);

  const sdom = g({ class: 'and-gate' }, [
    path(M(p1)
      .L(p2).L(p3)
      .A([ r, r ], 0, 0, 0, p4)
      .Z())
  ]);
  return {
    sdom,
    in: [
      vaddl([ 3/4, p1 ], [ 1/4, p2 ]),
      vaddl([ 1/4, p1 ], [ 3/4, p2 ]),
    ],
    out: vadd(p, vtimes(1 / 2, v)),
  };
}

export const NandGate = (p, v) => {
  const r = basel(1/2);
  const grect = gaterect(p, v);

  const p1 = grect.lt, p2 = grect.lb;
  const p3 = center(grect.lb, grect.rb);
  const p4 = center(grect.lt, grect.rt);

  const cr = basel(1/6);
  const cp = vadd(center(grect.rt, grect.rb), vtimes(cr / basel(1), v));

  const sdom = g({ class: 'nand-gate' }, [
    path(M(p1)
      .L(p2).L(p3)
      .A([ r, r ], 0, 0, 0, p4)
      .Z()),
    circle(cr, ...cp)
  ]);
  return {
    sdom,
    in: [
      vaddl([ 3/4, p1 ], [ 1/4, p2 ]),
      vaddl([ 1/4, p1 ], [ 3/4, p2 ]),
    ],
    out: vadd(cp, vtimes(cr / basel(1), v)),
  };
}

export const OrGate = (p, v) => {
  const r1 = basel(1);
  const r2 = r1 / 2;
  const grect = gaterect(p, v);

  const p1 = grect.lt, p2 = grect.lb;
  const p3 = center(grect.lb, grect.rb);
  const p4 = center(grect.lt, grect.rt);

  const sdom = g({ class: 'or-gate' }, [
    path(M(p1)
      .A([ r1, r1 ], 0, 0, 1, p2)
      .L(p3)
      .A([ r2, r2 ], 0, 0, 0, p4)
      .Z())
  ]);
  return {
    sdom,
    in: [
      vaddl([ 3/4, p1 ], [ 1/4, p2 ], [ 1/15, v ]),
      vaddl([ 1/4, p1 ], [ 3/4, p2 ], [ 1/15, v ]),
    ],
    out: vadd(p, vtimes(1 / 2, v)),
  }
}

export const NorGate = (p, v) => {
  const r1 = basel(1);
  const r2 = r1 / 2;
  const grect = gaterect(p, v);

  const p1 = grect.lt, p2 = grect.lb;
  const p3 = center(grect.lb, grect.rb);
  const p4 = center(grect.lt, grect.rt);

  const cr = basel(1/6);
  const cp = vadd(center(grect.rt, grect.rb), vtimes(cr / basel(1), v));

  const sdom = g({ class: 'nor-gate' }, [
    path(M(p1)
      .A([ r1, r1 ], 0, 0, 1, p2)
      .L(p3)
      .A([ r2, r2 ], 0, 0, 0, p4)
      .Z()),
    circle(cr, ...cp),
  ]);
  return {
    sdom: sdom,
    in: [
      vaddl([ 3/4, p1 ], [ 1/4, p2 ], [ 1/15, v ]),
      vaddl([ 1/4, p1 ], [ 3/4, p2 ], [ 1/15, v ]),
    ],
    out: vadd(cp, vtimes(cr / basel(1), v)),
  }
}

export const XorGate = (p, v) => {
  const r1 = basel(1);
  const r2 = r1 / 2;
  const grect = gaterect(p, v);

  const p1 = grect.lt, p2 = grect.lb;
  const p3 = center(grect.lb, grect.rb);
  const p4 = center(grect.lt, grect.rt);

  const a1 = vadd(p1, vtimes(-1/4, v));
  const a2 = vadd(p2, vtimes(-1/4, v));

  const sdom = g({ class: 'xor-gate' }, [
    path(M(p1)
      .A([ r1, r1 ], 0, 0, 1, p2)
      .L(p3)
      .A([ r2, r2 ], 0, 0, 0, p4)
      .Z()),
    path(M(a1)
      .A([ r1, r1 ], 0, 0, 1, a2).d),
  ]);
  return {
    sdom: sdom,
    in: [
      vaddl([ 3/4, p1 ], [ 1/4, p2 ], [ 1/15, v ]),
      vaddl([ 1/4, p1 ], [ 3/4, p2 ], [ 1/15, v ]),
    ],
    out: center(grect.rt, grect.rb),
  }
}

export const XnorGate = (p, v) => {
  const r1 = basel(1);
  const r2 = r1 / 2;
  const grect = gaterect(p, v);

  const p1 = grect.lt, p2 = grect.lb;
  const p3 = center(grect.lb, grect.rb);
  const p4 = center(grect.lt, grect.rt);

  const cr = basel(1/6);
  const cp = vadd(center(grect.rt, grect.rb), vtimes(cr / basel(1), v));

  const a1 = vadd(p1, vtimes(-1/4, v));
  const a2 = vadd(p2, vtimes(-1/4, v));

  const sdom = g({ class: 'xor-gate' }, [
    path(M(p1)
      .A([ r1, r1 ], 0, 0, 1, p2)
      .L(p3)
      .A([ r2, r2 ], 0, 0, 0, p4)
      .Z()),
    path(M(a1)
      .A([ r1, r1 ], 0, 0, 1, a2).d),
    circle(cr, ...cp),
  ]);
  return {
    sdom: sdom,
    in: [
      vaddl([ 3/4, p1 ], [ 1/4, p2 ], [ 1/15, v ]),
      vaddl([ 1/4, p1 ], [ 3/4, p2 ], [ 1/15, v ]),
    ],
    out: vadd(cp, vtimes(cr / basel(1), v)),
  }
}

export const DelayGate = (p, v) => {
  ;
}
