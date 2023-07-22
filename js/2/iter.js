export const range = (start, end, skip = 1) => {
  const list = [];
  for (let current = start; current < end; current += skip) {
    list.push(current);
  }
  return list;
}