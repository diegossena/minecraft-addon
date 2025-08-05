export function random_range(range1: number, range2: number) {
  return Math.random() * (range2 - range1) + range1;
}