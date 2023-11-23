export const anime = (callback) => {
  window.requestAnimationFrame(() => {
    callback(() => anime(callback));
  });
}