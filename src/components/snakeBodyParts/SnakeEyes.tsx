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

  // Beräkna ögonens position
  let topEyeX = segment.x * scale + scale / 2;
  let topEyeY = segment.y * scale + scale / 2;
  let bottomEyeX = segment.x * scale + scale / 2;
  let bottomEyeY = segment.y * scale + scale / 2;

  if (dx === 1) {
    // segment till höger
    topEyeX += horizontalOffset;
    bottomEyeX += horizontalOffset;
    topEyeY -= verticalOffset;
    bottomEyeY += verticalOffset;
  } else if (dx === -1) {
    // segment till vänster
    topEyeX -= horizontalOffset;
    bottomEyeX -= horizontalOffset;
    topEyeY -= verticalOffset;
    bottomEyeY += verticalOffset;
  } else if (dy === 1) {
    // segment nedåt
    topEyeY += verticalOffset;
    bottomEyeY += verticalOffset;
    topEyeX -= horizontalOffset;
    bottomEyeX += horizontalOffset;
  } else if (dy === -1) {
    // segment uppåt
    topEyeY -= verticalOffset;
    bottomEyeY -= verticalOffset;
    topEyeX -= horizontalOffset;
    bottomEyeX += horizontalOffset;
  }

  // Rita topp-öga
  ctx.beginPath();
  ctx.arc(topEyeX, topEyeY, eyeRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#0ee5c3';
  ctx.fill();

  // Rita botten-öga
  ctx.beginPath();
  ctx.arc(bottomEyeX, bottomEyeY, eyeRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#0ee5c3';
  ctx.fill();

  // Svarta horisontellt iris
  const irisWidth = scale / 6;
  const irisHeight = scale / 20;
  const irisRotation = dx !== 0 ? 0 : Math.PI / 2;

  // Rita iris för topp-ögat
  ctx.save();
  ctx.translate(topEyeX, topEyeY);
  ctx.rotate(irisRotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, irisWidth, irisHeight, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.restore();

  // Rita iris för botten-ögat
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
