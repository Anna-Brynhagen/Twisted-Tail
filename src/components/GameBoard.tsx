import { useCallback, useEffect, useRef, useState } from 'react';
import Snake from './Snake';
import { SnakeSegment } from '../types/Snake.types';
import SnakeFood from './SnakeFood';
import { useNavigate } from 'react-router';
import GameOverModal from './GameOverModal';
import Countdown from './CountDown';
import useAuth from '../hooks/useAuth';
import Card from 'react-bootstrap/Card';

const GameBoard = () => {
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
  const GRID_SIZE = 30;
  const scale = canvasSize / GRID_SIZE;
  const [isCountingDown, setIsCountingDown] = useState(true);
  const { addHighscore } = useAuth();
  const [lastMoveTime, setLastMoveTime] = useState<number>(0);

  const startGame = useCallback(() => {
    setIsCountingDown(false);
  }, []);

  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(
    'RIGHT'
  );

  const getValidFoodPosition = (
    snake: { x: number; y: number }[],
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT',
    GRID_SIZE: number
  ): { x: number; y: number } => {
    let newPosition: { x: number; y: number } = { x: -1, y: -1 };
    let isInvalidPosition = true;

    const head = snake[0];
    const forbiddenPosition = {
      x: head.x + (direction === 'LEFT' ? -1 : direction === 'RIGHT' ? 1 : 0),
      y: head.y + (direction === 'UP' ? -1 : direction === 'DOWN' ? 1 : 0),
    };

    while (isInvalidPosition) {
      newPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      isInvalidPosition =
        snake.some(
          (segment) =>
            segment.x === newPosition.x && segment.y === newPosition.y
        ) ||
        (newPosition.x === forbiddenPosition.x &&
          newPosition.y === forbiddenPosition.y);
    }
    return newPosition;
  };

  const [foodPosition, setFoodPosition] = useState<{ x: number; y: number }>(
    () => getValidFoodPosition(snake, 'RIGHT', GRID_SIZE)
  );

  const resizeCanvas = () => {
    const viewportSize = Math.min(window.innerWidth, window.innerHeight) - 150;
    const newSize = Math.min(700, Math.max(320, viewportSize));
    if (newSize !== canvasSize) {
      setCanvasSize(newSize);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const now = Date.now();
    const moveInterval = 200;

    if (
      ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      event.preventDefault();
    }

    if (isGameOver || now - lastMoveTime < moveInterval) return;
    setLastMoveTime(now);
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
        newHead.x >= Math.floor(canvasSize / scale) ||
        newHead.y < 0 ||
        newHead.y >= Math.floor(canvasSize / scale)
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
    const newPosition = getValidFoodPosition(snake, direction, GRID_SIZE);
    setFoodPosition(newPosition);
    SnakeFood.generateNewFood();
  };

  useEffect(() => {
    if (isCountingDown) return;
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', handleKeyDown);
    let snakeInterval: NodeJS.Timeout | null = null;
    if (!isGameOver) {
      snakeInterval = setInterval(() => {
        updateSnakePosition();
        setPulse((prev) => (prev > 0.2 ? prev - 0.05 : 1));
      }, 200);
    }
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      if (snakeInterval) {
        clearInterval(snakeInterval);
      }
    };
  }, [direction, isGameOver, isCountingDown]);

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

  const navigateToHighScore = () => {
    navigate('/highscore');
  };

  const handleTouch = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;
    const touchY = event.touches[0].clientY - rect.top;
    const head = snake[0];
    const scale = canvasSize / GRID_SIZE;
    const snakeX = head.x * scale + scale / 2;
    const snakeY = head.y * scale + scale / 2;
    const deltaX = touchX - snakeX;
    const deltaY = touchY - snakeY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && direction !== 'LEFT') setDirection('RIGHT');
      else if (deltaX < 0 && direction !== 'RIGHT') setDirection('LEFT');
    } else {
      if (deltaY > 0 && direction !== 'UP') setDirection('DOWN');
      else if (deltaY < 0 && direction !== 'DOWN') setDirection('UP');
    }
  };

  useEffect(() => {
    if (!isCountingDown && canvasRef.current) {
      setTimeout(() => {
        canvasRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'center',
        });
      }, 100);
    }
  }, [isCountingDown]);

  return (
    <div className="board-container">
      {isCountingDown && <Countdown onCountdownComplete={startGame} />}
      {!isCountingDown && (
        <>
          <GameOverModal
            show={isGameOver}
            score={score}
            onPlayAgain={resetGame}
            onGoToHighscores={navigateToHighScore}
          />
          <Card className="score-card">
            <Card.Body className="d-flex justify-content-center">
              <div>
                <span className="score-label">Score:</span>
                <span className="score-value ms-2">{score}</span>
              </div>
            </Card.Body>
            <canvas
              className="canvas-style"
              ref={canvasRef}
              onTouchStart={handleTouch}
              style={{
                width: `${canvasSize}px`,
                height: `${canvasSize}px`,
                touchAction: 'none',
              }}
            ></canvas>
          </Card>
        </>
      )}
    </div>
  );
};

export default GameBoard;
