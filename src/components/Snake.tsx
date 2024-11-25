import { SnakeSegment } from '../types/Snake.types';

export interface SnakeProps {
  segments: SnakeSegment[];
  scale: number;
}

const Snake = {
  draw: (
    ctx: CanvasRenderingContext2D,
    segments: SnakeSegment[],
    scale: number,
    pulse: number
  ) => {
    segments.forEach((segment, index) => {
      if (index === 0) {
        // Huvudet
        ctx.fillStyle = '#092437';
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);

        // Rita ögon
        const eyeRadius = scale / 8;
        const eyeOffsetX = scale / 3;
        const eyeOffsetY = scale / 6;

        // Öga topp
        ctx.beginPath();
        ctx.arc(
          segment.x * scale + scale / 2 + eyeOffsetX,
          segment.y * scale + eyeOffsetY,
          eyeRadius,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = '#0ee5c3'; // ögats färg
        ctx.fill();

        // Öga botten
        ctx.beginPath();
        ctx.arc(
          segment.x * scale + scale / 2 + eyeOffsetX,
          segment.y * scale + scale - eyeOffsetY,
          eyeRadius,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = '#0ee5c3'; // ögats färg
        ctx.fill();

        // Svarta horisontellt avsmalnade iris
        const irisWidth = scale / 6;
        const irisHeight = scale / 20;

        // Iris för ögat på toppen
        ctx.save();
        ctx.translate(
          segment.x * scale + scale / 2 + eyeOffsetX,
          segment.y * scale + eyeOffsetY
        );
        ctx.beginPath();
        ctx.ellipse(0, 0, irisWidth, irisHeight, 0, 0, 2 * Math.PI);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.restore();

        // Iris för ögat på botten
        ctx.save();
        ctx.translate(
          segment.x * scale + scale / 2 + eyeOffsetX,
          segment.y * scale + scale - eyeOffsetY
        );
        ctx.beginPath();
        ctx.ellipse(0, 0, irisWidth, irisHeight, 0, 0, 2 * Math.PI);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.restore();
      } else if (index === segments.length - 1) {
        // Svansen
        ctx.fillStyle = '#092437';
        ctx.beginPath();
        ctx.moveTo(segment.x * scale + scale, segment.y * scale);
        ctx.lineTo(segment.x * scale + scale, segment.y * scale + scale);
        ctx.lineTo(segment.x * scale, segment.y * scale + scale / 2);
        ctx.closePath();
        ctx.fill();
      } else {
        // Resten av kroppen.
        ctx.fillStyle = '#092437';
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);

        // Smalt streck med pulserande effekt
        const stripeHeight = scale / 7;
        ctx.fillStyle = `rgba(182, 79, 76, ${pulse})`;
        ctx.fillRect(
          segment.x * scale,
          segment.y * scale + (scale - stripeHeight) / 2,
          scale,
          stripeHeight
        );
      }
    });
  },
};

export default Snake;
