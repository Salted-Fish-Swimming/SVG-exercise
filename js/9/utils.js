export const range = n => Array(n).fill(0).map((_, i) => i);

export const curried2 = fn => (a, b) => {
  if (b) {
    return fn(a, b);
  } else {
    return x => fn(a, x);
  }
}