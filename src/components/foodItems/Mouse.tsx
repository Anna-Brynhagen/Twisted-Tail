const Mouse = {
  draw: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number
  ) => {
    // Mouse body
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.arc(x, y, scale / 4, 0, 2 * Math.PI);
    ctx.fill();

    // ears
    ctx.beginPath();
    ctx.arc(x - scale / 5, y - scale / 5, scale / 6, 0, 2 * Math.PI);
    ctx.arc(x + scale / 5, y - scale / 5, scale / 6, 0, 2 * Math.PI);
    ctx.fill();

    // eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x - scale / 10, y - scale / 12, scale / 25, 0, 2 * Math.PI);
    ctx.arc(x + scale / 10, y - scale / 12, scale / 25, 0, 2 * Math.PI);
    ctx.fill();

    // nose
    ctx.fillStyle = 'pink';
    ctx.beginPath();
    ctx.arc(x, y + scale / 15, scale / 20, 0, 2 * Math.PI);
    ctx.fill();
  },
};

export default Mouse;
