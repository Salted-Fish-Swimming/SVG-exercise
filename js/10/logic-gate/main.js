import { S, renderSdom } from "../../6/svg.js";
import { vadd } from "../../9/vec.js";
import { M } from "../path.js";
import { basel, basex, basey, connect, xlTo } from "./coord.js";
import { AndGate, NandGate, NorGate, NotGate, OrGate, XorGate } from "./logate.js";
import { circle, g, path, point } from "./sdom.js";

const text = ([ x, y ], txt) => S('text', { x, y, font: { size: 38 } }, [ txt ]);

export const RS_Latch = (p, v) => {
  const nor1 = NorGate(basey(-3/2), basex(1));
  const nor2 = NorGate(basey(3/2), basex(1));

  const line1 = path(
    M(xlTo(basel(-2), nor1.in[0]))
    .L(nor1.in[0]).d);
  const line2 = path(
    M(xlTo(basel(-2), nor2.in[1]))
    .L(nor2.in[1]).d);

  const line3 = path(M(nor1.out).L(xlTo(basel(5/2), nor1.out)).d);
  const line4 = path(M(nor2.out).L(xlTo(basel(5/2), nor2.out)).d);

  const line5 = path(
    M(nor1.in[1])
    .L(xlTo(basel(-1), nor1.in[1]))
    .L([ basel(-1), basel(-1/2) ])
    .L([ basel(5/4), basel(1/2) ])
    .L([ basel(5/4), basel(3/2) ]).d);
  const line6 = path(
    M(nor2.in[0])
    .L(xlTo(basel(-1), nor2.in[0]))
    .L([ basel(-1), basel(1/2) ])
    .L([ basel(5/4), basel(-1/2)])
    .L([ basel(5/4), basel(-3/2) ]).d);

  return [
    nor1.sdom,
    nor2.sdom,
    text([ -110, 85 ], 'R'),
    text([ -110, -55 ], 'S'),
    text([ 110, -45 ], 'Q'),
    text([ 110, 75 ], 'Q\''),
    line1, line2,
    line3, line4,
    line5, line6,
  ];
}

const Xor_Gate = (p, v) => {
  const nor1 = NorGate(basex(-2.5), v);
  const nor2 = NorGate(basey(-1), v);
  const nor3 = NorGate(basey(1), v);
  const nor4 = NorGate(basex(2.5), v);

  const l1 = path(M(xlTo(basel(-5), nor2.in[0])).L(nor2.in[0]).d);
  const l2 = path(M(xlTo(basel(-5), nor3.in[1])).L(nor3.in[1]).d);

  const l3 = path(M(xlTo(basel(-3.5), nor2.in[0]))
    .L(xlTo(basel(-3.5), nor1.in[0]))
    .L(nor1.in[0]).d);
  const l4 = path(M(xlTo(basel(-3.5), nor3.in[1]))
    .L(xlTo(basel(-3.5), nor1.in[1]))
    .L(nor1.in[1]).d);

  const l5 = path(M(nor2.in[1])
    .L(xlTo(basel(-1), nor2.in[1]))
    .L(xlTo(basel(-1), nor3.in[0]))
    .L(nor3.in[0]).d);
  const l6 = path(M(nor1.out).L(xlTo(basel(-1), nor1.out)).d);

  const l7 = path(M(nor2.out)
    .L(xlTo(basel(1.5), nor2.out))
    .L(xlTo(basel(1.5), nor4.in[0]))
    .L(nor4.in[0]).d);
  const l8 = path(M(nor3.out)
    .L(xlTo(basel(1.5), nor3.out))
    .L(xlTo(basel(1.5), nor4.in[1]))
    .L(nor4.in[1]).d);

  const l9 = path(M(nor4.out).L(xlTo(basel(4.5), nor4.out)).d);

  return [
    nor1.sdom,
    nor2.sdom,
    nor3.sdom,
    nor4.sdom,
    l1, l2, l3, l4,
    l5, l6,
    l7, l8,
    l9,
  ];
}

const Full_Adder = (p, v) => {
  const and1 = AndGate([basel(1/4), basel(1/2)], v);
  const and2 = AndGate([ basel(-2), basel(2) ], v)

  const xor1 = XorGate([ basel(-2), basel(-1.5) ], v)
  const xor2 = XorGate([ basel(2), basel(-1.25) ], v)

  const or = OrGate([ basel(2), basel(1.75) ], v);

  const la1 = path(M([ basel(-5), basel(-1.75) ])
    .L(xor1.in[0]).d);
  const ap = point(basel(-3.25), basel(-1.75));
  const la2 = path(M([ basel(-3.25), basel(-1.75) ])
    .L([ basel(-3.25), basel(1.75) ])
    .L(and2.in[0]).d);
  
  const lb1 = path(M([ basel(-5), basel(-0.75) ])
    .L([ basel(-3.75), basel(-0.75) ])
    .L([ basel(-3.75), basel(-1.25) ])
    .L(xor1.in[1]).d);
  const bp = point(basel(-3.75), basel(-0.75));
  const lb2 = path(M([ basel(-3.75), basel(-0.75) ])
    .L([ basel(-3.75), basel(2.25) ])
    .L(and2.in[1]).d);
  
  const lci1 = path(M([ basel(-5), basel(0.25) ])
    .L([ basel(-1.25), basel(0.25) ])
    .L([ basel(-1.25), basel(-1) ])
    .L(xor2.in[1]).d);
  const cip = point(basel(-1.25), basel(0.25));
  const lci2 = path(M([ basel(-1.25), basel(0.25) ])
    .L([ basel(-1.25), basel(0.75) ])
    .L(and1.in[1]).d);
  
  const w1l1 = path(M(xor1.out).L(xor2.in[0]).d);
  const w1lp = point(basel(-0.75), basel(-1.5));
  const w1l2 = path(M([ basel(-0.75), basel(-1.5) ])
    .L([ basel(-0.75), basel(0.25) ])
    .L(and1.in[0]).d);
  
  const w2 = path(M(and2.out).L(or.in[1]).d);
  const w3 = path(M(and1.out)
    .L([ basel(1.125), basel(0.5) ])
    .L([ basel(1.125), basel(1.5) ])
    .L(or.in[0]).d);

  const ls = path(M(xor2.out).L([ basel(3.5), basel(-1.25) ]).d);
  const lco = path(M(or.out).L([ basel(3.5), basel(1.75) ]).d);

  const gname = (name, children) => g({ class: name }, children);

  return [
    and1.sdom, and2.sdom,
    xor1.sdom, xor2.sdom,
    or.sdom,
    gname('A', [ la1, la2, ap, ]),
    gname('B', [lb1, lb2, bp]),
    gname('Ci', [lci1, lci2, cip]),
    gname('wire-1', [w1l1, w1lp, w1l2]),
    gname('wire-2', [w2]),
    gname('wire-3', [w3]),
    gname('S', [ls]), gname('Co', [lco]),
  ]
}

export const renderSubSdoms = () => {
  return RS_Latch([0, 0], basex(1));
}