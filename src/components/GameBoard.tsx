import { useEffect, useRef, useState } from 'react';
import Snake, { SnakeSegment } from './Snake';

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState<number>(300);
  const [snake, setSnake] = useState<SnakeSegment[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ]);
  const scale = canvasSize / 30; // Antal rutor i spelplanen

  const resizeCanvas = () => {
    const viewportSize = Math.min(window.innerWidth, window.innerHeight) - 50;
    const newSize = Math.max(200, viewportSize);
    if (newSize !== canvasSize) {
      setCanvasSize(newSize);
    }
  };

  const updateSnakePosition = () => {
    setSnake((prevSnake) => {
      const newHead = { x: prevSnake[0].x + 1, y: prevSnake[0].y }; // Flytta huvudet åt höger
      const newSnake = [newHead, ...prevSnake.slice(0, -1)]; // Lägg till nytt huvud, ta bort sista
      return newSnake;
    });
  };

  const drawBoardAndSnake = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Rita spelplanen
    const scaleFactor = window.devicePixelRatio || 1;
    canvas.width = canvasSize * scaleFactor;
    canvas.height = canvasSize * scaleFactor;
    ctx.scale(scaleFactor, scaleFactor);

    ctx.fillStyle = '#0b5852';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    Snake.draw(ctx, snake, scale);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const interval = setInterval(updateSnakePosition, 200); // Uppdatera position var 200ms så den rör sig
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(interval); // Städa upp interval
    };
  }, []);

  useEffect(() => {
    drawBoardAndSnake();
  }, [snake, canvasSize]);

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
