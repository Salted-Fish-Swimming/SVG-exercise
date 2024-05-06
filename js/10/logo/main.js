import { Pi } from "../../8/math.js";
import { unir, vaddl, vtimes } from "../../9/vec.js";
import { S } from '../../6/svg.js'
import { M } from "../path.js";

const polygon = (d) => {
  return S('path', {
    stroke: {
      self: 'black',
      linecap: 'round',
      linejoin: 'round',
      width: 0,
    },
    fill: '#ff9944', d
  });
}

const lambda_logo = (unit) => {
  const v1 = vtimes(unit, unir(Pi * 0 / 3));
  const v2 = vtimes(unit, unir(Pi * 1 / 3));
  const v3 = vtimes(unit, unir(Pi * 2 / 3));
  const og = [ -18, 0 ];
  
  const part1 = (() => {
    const p1 = vaddl([ 1, og ], [ -0.1, v1 ]);
    const p2 = vaddl([ 1, p1 ], [ -0.8, v2 ]);
    const p3 = vaddl([ 1, p2 ], [ 2.4, v3 ]);
    const p4 = vaddl([ 1, p3 ], [ 0.8, v1 ]);
    return polygon(M(p1).L(p2).L(p3).L(p4).Z());
  })();
  const part2 = (() => {
    const p1 = vaddl([ 1, og ], [ 0.1, v1 ], [ -1.8, v2 ]);
    const p2 = vaddl([ 1, p1 ], [ 0.8, v1 ]);
    const p3 = vaddl([ 1, p2 ], [ 3.4, v2 ]);
    const p4 = vaddl([ 1, p3 ], [ -0.8, v1 ])
    return polygon(M(p1).L(p2).L(p3).L(p4).Z());
  })();
  const part3 = (() => {
    const p1 = vaddl([ 1, og ], [ 1.1, v1 ], [ 0.8, v2 ]);
    const p2 = vaddl([ 1, p1 ], [ 0.8, v1 ]);
    const p3 = vaddl([ 1, p2 ], [ 0.8, v2 ]);
    const p4 = vaddl([ 1, p3 ], [ -0.8, v1 ]);
    return polygon(M(p1).L(p2).L(p3).L(p4).Z());
  })();

  return [ part1, part2, part3 ];
}

const minus = vtimes(-1)

const kink_logo = (orign, unit) => {
  const x = [ unit, unit ];
  const y = [ unit, -unit ];

  const centerPart = (() => {
    const p1 = vaddl([1, orign], [1/2, x], [3/2, y]);
    const p2 = vaddl([1, p1], [-1, x]);
    const p3 = vaddl([1, p2], [-3, y]);
    const p4 = vaddl([1, p3], [1, x]);

    return polygon(M(p1).L(p2).L(p3).L(p4).Z());
  })();

  const groupGenerator = (x, y) => {
    const part1 = (() => {
      const p1 = vaddl([1, orign], [1, x], [1/2, y]);
      const p2 = vaddl([1, p1], [9/2, x]);
      const p3 = vaddl([1, p2], [5, y]);
      const p4 = vaddl([1, p3], [-5, x]);
      const p5 = vaddl([1, p4], [-2, y]);
      const p6 = vaddl([1, p5], [-1, x]);
      const p7 = vaddl([1, p6], [3, y]);
      const p8 = vaddl([1, p7], [7, x]);
      const p9 = vaddl([1, p8], [-7, y]);
      const p10 = vaddl([1, p9], [-11/2, x])

      return polygon(M(p1).L(p2).L(p3).L(p4).L(p5).L(p6).L(p7).L(p8).L(p9).L(p10).Z());
    })();

    const part2 = (() => {
      const p1 = vaddl([1, orign], [2, x], [1, y]);
      const p2 = vaddl([1, p1], [1, x]);
      const p3 = vaddl([1, p2], [2, y]);
      const p4 = vaddl([1, p3], [-9/2, x]);
      const p5 = vaddl([1, p4], [-1, y]);
      const p6 = vaddl([1, p5], [7/2, x]);

      return polygon(M(p1).L(p2).L(p3).L(p4).L(p5).L(p6).Z());
    })();

    const part3 = (() => {
      const p1 = vaddl([1, orign], [2, x], [-1, y]);
      const p2 = vaddl([1, p1], [-8, y]);
      const p3 = vaddl([1, p2], [7, x]);
      const p4 = vaddl([1, p3], [7, y]);
      const p5 = vaddl([1, p4], [-11/2, x ]);
      const p6 = vaddl([1, p5], [-1, y]);
      const p7 = vaddl([1, p6], [9/2, x]);
      const p8 = vaddl([1, p7], [-5, y]);
      const p9 = vaddl([1, p8], [-5, x]);
      const p10 = vaddl([1, p9], [7, y]);

      return polygon(M(p1).L(p2).L(p3).L(p4).L(p5).L(p6).L(p7).L(p8).L(p9).L(p10).Z());
    })();

    return [ part1, part2, part3 ];
  }

  const leftParts = groupGenerator(x, y);
  const rightParts = groupGenerator(minus(x), minus(y));

  return [ centerPart, ...leftParts, ...rightParts ];
}

export const renderSubSdoms = () => {
  return [
    ...kink_logo([0, 0], 8),
    // ...lambda_logo(40),
  ];
}
