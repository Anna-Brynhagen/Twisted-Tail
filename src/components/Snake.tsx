import { SnakeSegment } from '../types/Snake.types';
import BodySegment from './snakeBodyParts/BodySegment';
import SnakeEyes from './snakeBodyParts/SnakeEyes';
import Tail from './snakeBodyParts/SnakeTail';

const Snake = {
  draw: (
    ctx: CanvasRenderingContext2D,
    segments: SnakeSegment[],
    scale: number,
    pulse: number
  ) => {
    segments.forEach((segment, index) => {
      if (index === 0) {
        // head
        ctx.fillStyle = '#092437';
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
        // eyes
        SnakeEyes({
          ctx,
          segment,
          nextSegment: segments[1],
          scale,
        });
      } else if (index === segments.length - 1) {
        // tail
        Tail({
          ctx,
          scale,
          lastSegment: segment,
          secondLastSegment: segments[index - 1],
        });
      } else {
        // body
        BodySegment({
          ctx,
          scale,
          segment,
          pulse,
        });
      }
    });
  },
};

export default Snake;
