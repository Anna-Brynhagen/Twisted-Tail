import { useCallback, useEffect, useRef, useState } from 'react';
import Snake from './Snake';
import { SnakeSegment } from '../types/Snake.types';
import SnakeFood from './SnakeFood';
import { useNavigate } from 'react-router';
import GameOverModal from './GameOverModal';
import Countdown from './CountDown';
import useAuth from '../hooks/useAuth';

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState<number>(300);
  const navigate = useNavigate();
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [snake, setSnake] = useState<SnakeSegment[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ]);
  const [pulse, setPulse] = useState<number>(1);
  const scale = canvasSize / 30;
  const [isCountingDown, setIsCountingDown] = useState(true);
  const { addHighscore } = useAuth();

  const startGame = useCallback(() => {
    setIsCountingDown(false);
  }, []);

  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(
    'RIGHT'
  );

  const [foodPosition, setFoodPosition] = useState<{ x: number; y: number }>(
    () => ({
      x: Math.floor(Math.random() * 30),
      y: Math.floor(Math.random() * 30),
    })
  );

  const resizeCanvas = () => {
    const viewportSize = Math.min(window.innerWidth, window.innerHeight) - 150;
    const newSize = Math.min(700, Math.max(320, viewportSize));
    if (newSize !== canvasSize) {
      setCanvasSize(newSize);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isGameOver) return;
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
    if (isGameOver) return;
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

      if (
        newHead.x < 0 ||
        newHead.x >= canvasSize / scale ||
        newHead.y < 0 ||
        newHead.y >= canvasSize / scale
      ) {
        handleGameOver();
        return prevSnake;
      }

      const collisionWithSelf = prevSnake.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      );
      if (collisionWithSelf) {
        handleGameOver();
        return prevSnake;
      }

      if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
        generateFoodPosition();
        setScore((prevScore) => prevScore + 1);
        return [newHead, ...prevSnake];
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
    SnakeFood.draw(ctx, foodPosition, scale);
  };

  const generateFoodPosition = () => {
    let newPosition = { x: foodPosition.x, y: foodPosition.y };
    do {
      newPosition = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30),
      };
    } while (
      snake.some(
        (segment) => segment.x === newPosition.x && segment.y === newPosition.y
      )
    );
    setFoodPosition(newPosition);
    SnakeFood.generateNewFood();
    console.log(SnakeFood);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', handleKeyDown);
    let snakeInterval: NodeJS.Timeout | null = null;
    if (!isGameOver) {
      console.log('Starting snake update interval');
      snakeInterval = setInterval(() => {
        console.log('Updating snake position');
        updateSnakePosition();
      }, 200);
    }
    const pulseInterval = setInterval(updatePulse, 50);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      if (snakeInterval) {
        console.log('Clearing snake update interval');
        clearInterval(snakeInterval);
      }
      clearInterval(pulseInterval);
    };
  }, [direction, isGameOver]);

  useEffect(() => {
    drawBoardAndSnake();
  }, [snake, canvasSize]);

  const handleGameOver = async () => {
    setIsGameOver(true);

    try {
      await addHighscore(score);
    } catch (error) {
      console.error('Error saving highscore:', error);
    }
  };

  const resetGame = () => {
    setIsGameOver(false);
    setIsCountingDown(true);
    setSnake([
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ]);
    setScore(0);
    setDirection('RIGHT');
    generateFoodPosition();
  };

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="board-container">
      {isCountingDown && <Countdown onCountdownComplete={startGame} />}
      {!isCountingDown && (
        <>
          <GameOverModal
            show={isGameOver}
            score={score}
            onPlayAgain={resetGame}
            onGoHome={navigateHome}
          />
          <div className="score-display">Score: {score}</div>
          <canvas
            className="canvas-style"
            ref={canvasRef}
            style={{
              width: `${canvasSize}px`,
              height: `${canvasSize}px`,
            }}
          ></canvas>
        </>
      )}
    </div>
  );
};

export default GameBoard;
