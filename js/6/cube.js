import { add, isVec3, vec2, vec3 } from "./vec.js";

const dirct = (x, ...xs) => {
  if (xs.length > 0) {
    return x.flatMap(v =>
      dirct(...xs).map(vs => [ v, ...vs ]));
  } else {
    return x.map(v => [ v ]);
  }
}

const btd = (bs) => {
  let d = 0;
  for (const b of bs) {
    d *= 2;
    d += b;
  }
  return d;
}

const i = [0, 1];

const cubeSet = dirct(i, i, i);
const center = vec3(1, 1, 1).times(0.5);

const cubePoints = cubeSet.map((xyz) => {
  return vec3(...xyz).add(center.times(-1));
});


export const cubeEdges = (() => {
  const not = x => x === 0 ? 1 : 0;
  const near = ([ x, y, z ]) => {
    return [
      [ not(x), y, z ],
      [ x, not(y), z ],
      [ x, y, not(z) ],
    ];
  }

  const edgeIndexs = cubeSet.flatMap(s => {
    const curIdx = btd(s);
    return near(s).map(btd).filter(x => x > curIdx).map(x => [curIdx, x]);
  });

  const edges = edgeIndexs.map(([ i1, i2 ]) => [
    cubePoints[i1], cubePoints[i2]
  ]);

  return edges;

})();

const vidPos = vec3(3, 0, 0);
const vidSig = vec3(-1, 0, 0);

const dot = (v1, v2) => {
  if (isVec3(v1) && isVec3(v2)) {
    return v1.x * v2.x + v1.y * v2.y + v1.z *v2.z;
  } else {
    throw new Error('undefined behavior');
  }
}

const minus = (v1, v2) => add(v1, v2.times(-1));

const proj = (v) => {
  const d = dot(vidSig, minus(v, vidPos));
  const pv = v.times(1 / d);
  return vec2(pv.y, pv.z);
}

export const projEdges = cubeEdges => cubeEdges.map(([p1, p2]) => {
  return [ proj(p1), proj(p2) ];
})