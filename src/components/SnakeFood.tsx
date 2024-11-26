const Food = {
  draw: (
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number },
    scale: number
  ) => {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(
      position.x * scale + scale / 2,
      position.y * scale + scale / 2,
      scale / 3,
      0,
      2 * Math.PI
    );
    ctx.fill();
  },
};

export default Food;
