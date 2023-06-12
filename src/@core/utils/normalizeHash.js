export const normalizeHash = (hash, min, max) => {
  return Math.floor((hash % (max - min)) + min);
};