interface BodySegmentProps {
  ctx: CanvasRenderingContext2D;
  scale: number;
  segment: { x: number; y: number };
  pulse: number;
}

const BodySegment: React.FC<BodySegmentProps> = ({
  ctx,
  scale,
  segment,
  pulse,
}) => {
  ctx.fillStyle = '#092437';
  ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);

  // Diamond with pulsating effect
  ctx.fillStyle = `rgba(182, 79, 76, ${pulse})`;
  ctx.beginPath();
  const centerX = segment.x * scale + scale / 2;
  const centerY = segment.y * scale + scale / 2;
  const diamondWidth = scale / 3;
  const diamondHeight = scale / 3;

  // Diamonds four corners
  ctx.moveTo(centerX, centerY - diamondHeight / 2);
  ctx.lineTo(centerX + diamondWidth / 2, centerY);
  ctx.lineTo(centerX, centerY + diamondHeight / 2);
  ctx.lineTo(centerX - diamondWidth / 2, centerY);
  ctx.closePath();
  ctx.fill();

  return null;
};

export default BodySegment;
