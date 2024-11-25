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

  // Rita diamantformen med pulserande effekt
  ctx.fillStyle = `rgba(182, 79, 76, ${pulse})`;
  ctx.beginPath();
  const centerX = segment.x * scale + scale / 2;
  const centerY = segment.y * scale + scale / 2;
  const diamondWidth = scale / 3; // Diamantens bredd
  const diamondHeight = scale / 3; // Diamantens höjd

  // Diamantens fyra hörn
  ctx.moveTo(centerX, centerY - diamondHeight / 2); // Övre spets
  ctx.lineTo(centerX + diamondWidth / 2, centerY); // Höger spets
  ctx.lineTo(centerX, centerY + diamondHeight / 2); // Nedre spets
  ctx.lineTo(centerX - diamondWidth / 2, centerY); // Vänster spets
  ctx.closePath();
  ctx.fill();

  return null;
};

export default BodySegment;
