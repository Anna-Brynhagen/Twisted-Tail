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

  const resizeCanvas = () => {
    const viewportSize = Math.min(window.innerWidth, window.innerHeight) - 50;
    const newSize = Math.max(200, viewportSize);
    if (newSize !== canvasSize) {
      setCanvasSize(newSize);
    }
  };

  const updateSnakePosition = () => {
    setSnake((prevSnake) => {
      const newHead = { x: prevSnake[0].x + 1, y: prevSnake[0].y };
      const newSnake = [newHead, ...prevSnake.slice(0, -1)];
      return newSnake;
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

    const snakeInterval = setInterval(updateSnakePosition, 300);
    const pulseInterval = setInterval(updatePulse, 50);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(snakeInterval);
      clearInterval(pulseInterval);
    };
  }, []);

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
