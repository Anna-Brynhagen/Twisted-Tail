const Food = {
  draw: (
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number },
    scale: number
  ) => {
    // Äpplets huvuddel
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

    // Äpplets skugga
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(
      position.x * scale + scale / 2 + scale / 10,
      position.y * scale + scale / 2 + scale / 10,
      scale / 4,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Stjälken
    ctx.fillStyle = 'green';
    ctx.fillRect(
      position.x * scale + scale / 2 - scale / 20,
      position.y * scale + scale / 2 - scale / 3,
      scale / 10,
      scale / 6
    );

    // Blad
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(
      position.x * scale + scale / 2 + scale / 6,
      position.y * scale + scale / 2 - scale / 3,
      scale / 10,
      0,
      2 * Math.PI
    );
    ctx.fill();
  },
};

export default Food;
