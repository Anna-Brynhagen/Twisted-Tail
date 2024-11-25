export type SnakeSegment = {
  x: number;
  y: number;
};

export interface SnakeProps {
  segments: SnakeSegment[];
  scale: number;
}

const Snake = {
  draw: (
    ctx: CanvasRenderingContext2D,
    segments: SnakeSegment[],
    scale: number
  ) => {
    ctx.fillStyle = ' #1a1a00';
    segments.forEach((segment) => {
      ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
    });
  },
};

export default Snake;
