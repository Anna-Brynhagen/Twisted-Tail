const GreenApple = {
  draw: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number
  ) => {
    // Apple top
    ctx.fillStyle = '#3dd94c';
    ctx.beginPath();
    ctx.arc(x, y, scale / 3, 0, 2 * Math.PI);
    ctx.fill();

    // Apple shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(x + scale / 10, y + scale / 10, scale / 4, 0, 2 * Math.PI);
    ctx.fill();

    // stick
    ctx.fillStyle = '#592b0b';
    ctx.fillRect(x - scale / 20, y - scale / 3, scale / 10, scale / 6);

    // leaf
    ctx.fillStyle = '#1e3822';
    ctx.beginPath();
    ctx.arc(x + scale / 6, y - scale / 3, scale / 10, 0, 2 * Math.PI);
    ctx.fill();
  },
};

export default GreenApple;
