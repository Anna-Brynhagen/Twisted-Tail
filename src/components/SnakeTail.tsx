interface TailProps {
  ctx: CanvasRenderingContext2D;
  scale: number;
  lastSegment: { x: number; y: number };
  secondLastSegment: { x: number; y: number };
}

const Tail: React.FC<TailProps> = ({
  ctx,
  scale,
  lastSegment,
  secondLastSegment,
}) => {
  const dx = lastSegment.x - secondLastSegment.x;
  const dy = lastSegment.y - secondLastSegment.y;
  const tailDirection =
    dx === 1 ? 'RIGHT' : dx === -1 ? 'LEFT' : dy === 1 ? 'DOWN' : 'UP';

  const drawTail = (coords: [number, number][]) => {
    ctx.beginPath();
    ctx.moveTo(coords[0][0], coords[0][1]);
    coords.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.closePath();
    ctx.fill();
  };

  ctx.fillStyle = '#092437';

  if (tailDirection === 'RIGHT') {
    drawTail([
      [lastSegment.x * scale, lastSegment.y * scale],
      [lastSegment.x * scale, lastSegment.y * scale + scale],
      [lastSegment.x * scale + scale, lastSegment.y * scale + scale / 2],
    ]);
  } else if (tailDirection === 'LEFT') {
    drawTail([
      [lastSegment.x * scale + scale, lastSegment.y * scale],
      [lastSegment.x * scale + scale, lastSegment.y * scale + scale],
      [lastSegment.x * scale, lastSegment.y * scale + scale / 2],
    ]);
  } else if (tailDirection === 'DOWN') {
    drawTail([
      [lastSegment.x * scale, lastSegment.y * scale],
      [lastSegment.x * scale + scale, lastSegment.y * scale],
      [lastSegment.x * scale + scale / 2, lastSegment.y * scale + scale],
    ]);
  } else if (tailDirection === 'UP') {
    drawTail([
      [lastSegment.x * scale, lastSegment.y * scale + scale],
      [lastSegment.x * scale + scale, lastSegment.y * scale + scale],
      [lastSegment.x * scale + scale / 2, lastSegment.y * scale],
    ]);
  }

  return null;
};

export default Tail;
