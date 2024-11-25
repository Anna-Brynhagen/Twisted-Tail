import { useEffect, useRef, useState } from 'react';
import Snake from './Snake';
import { SnakeSegment } from '../types/Snake.types';

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState<number>(300);
  const [snake, setSnake] = useState<SnakeSegment[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ]);
  const [pulse, setPulse] = useState<number>(1);
  const scale = canvasSize / 30;

  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(
    'RIGHT'
  );

  const resizeCanvas = () => {
    const viewportSize = Math.min(window.innerWidth, window.innerHeight) - 150;
    const newSize = Math.min(700, Math.max(320, viewportSize));
    if (newSize !== canvasSize) {
      setCanvasSize(newSize);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
    }
  };

  const updateSnakePosition = () => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      let newHead;

      switch (direction) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
        default:
          return prevSnake;
      }
      return [newHead, ...prevSnake.slice(0, -1)];
    });
  };

  const updatePulse = () => {
    setPulse((prev) => (prev > 0.2 ? prev - 0.05 : 1));
  };

  const drawBoardAndSnake = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleFactor = window.devicePixelRatio || 1;
    canvas.width = canvasSize * scaleFactor;
    canvas.height = canvasSize * scaleFactor;
    ctx.scale(scaleFactor, scaleFactor);

    ctx.fillStyle = '#0b5852';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    Snake.draw(ctx, snake, scale, pulse);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', handleKeyDown);

    const snakeInterval = setInterval(updateSnakePosition, 300);
    const pulseInterval = setInterval(updatePulse, 50);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(snakeInterval);
      clearInterval(pulseInterval);
    };
  }, [direction]);

  useEffect(() => {
    drawBoardAndSnake();
  }, [snake, canvasSize, pulse]);

  return (
    <div className="board-container">
      <canvas
        className="canvas-style"
        ref={canvasRef}
        style={{
          width: `${canvasSize}px`,
          height: `${canvasSize}px`,
        }}
      ></canvas>
    </div>
  );
};

export default GameBoard;
