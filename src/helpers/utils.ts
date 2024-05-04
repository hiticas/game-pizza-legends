export const utils = {
  withGrid(n: number) {
    return n * 16;
  },
  asGridCoords(x: number, y: number) {
    return `${x * 16},${y * 16}`;
  },
  nextPosition(initialX: number, initialY: number, direction: string) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    } else if (direction === "left") {
      x -= size;
    } else if (direction === "right") {
      x += size;
    }
    return { x, y };
  },
};
