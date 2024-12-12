interface SnakeEyesProps {
  ctx: CanvasRenderingContext2D;
  segment: { x: number; y: number };
  nextSegment: { x: number; y: number };
  scale: number;
}

const SnakeEyes: React.FC<SnakeEyesProps> = ({
  ctx,
  segment,
  nextSegment,
  scale,
}) => {
  const eyeRadius = scale / 8;
  const horizontalOffset = scale / 4;
  const verticalOffset = scale / 4;

  const dx = nextSegment.x - segment.x;
  const dy = nextSegment.y - segment.y;

  // calculate eyes position
  let topEyeX = segment.x * scale + scale / 2;
  let topEyeY = segment.y * scale + scale / 2;
  let bottomEyeX = segment.x * scale + scale / 2;
  let bottomEyeY = segment.y * scale + scale / 2;

  if (dx === 1) {
    // segment right
    topEyeX += horizontalOffset;
    bottomEyeX += horizontalOffset;
    topEyeY -= verticalOffset;
    bottomEyeY += verticalOffset;
  } else if (dx === -1) {
    // segment left
    topEyeX -= horizontalOffset;
    bottomEyeX -= horizontalOffset;
    topEyeY -= verticalOffset;
    bottomEyeY += verticalOffset;
  } else if (dy === 1) {
    // segment down
    topEyeY += verticalOffset;
    bottomEyeY += verticalOffset;
    topEyeX -= horizontalOffset;
    bottomEyeX += horizontalOffset;
  } else if (dy === -1) {
    // segment up
    topEyeY -= verticalOffset;
    bottomEyeY -= verticalOffset;
    topEyeX -= horizontalOffset;
    bottomEyeX += horizontalOffset;
  }

  // draw top-eye
  ctx.beginPath();
  ctx.arc(topEyeX, topEyeY, eyeRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#0ee5c3';
  ctx.fill();

  // draw bottom-eye
  ctx.beginPath();
  ctx.arc(bottomEyeX, bottomEyeY, eyeRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#0ee5c3';
  ctx.fill();

  // black iris
  const irisWidth = scale / 6;
  const irisHeight = scale / 20;
  const irisRotation = dx !== 0 ? 0 : Math.PI / 2;

  // iris top-eye
  ctx.save();
  ctx.translate(topEyeX, topEyeY);
  ctx.rotate(irisRotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, irisWidth, irisHeight, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.restore();

  // iris bottom-eye
  ctx.save();
  ctx.translate(bottomEyeX, bottomEyeY);
  ctx.rotate(irisRotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, irisWidth, irisHeight, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.restore();

  return null;
};

export default SnakeEyes;
