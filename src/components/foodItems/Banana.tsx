const Banana = {
  draw: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number
  ) => {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(x - scale / 4, y + scale / 6);
    ctx.quadraticCurveTo(x, y - scale / 3, x + scale / 4, y + scale / 6);
    ctx.lineTo(x + scale / 6, y + scale / 4);
    ctx.quadraticCurveTo(x, y - scale / 6, x - scale / 6, y + scale / 4);
    ctx.closePath();
    ctx.fill();
  },
};

export default Banana;
