import { useEffect, useRef } from 'react';

const ArrowKeysCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pressedKey = useRef<string | null>(null);

  const drawArrowKeys = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const keySize = 70;
    const padding = 10;
    const totalWidth = 3 * keySize + 2 * padding;
    const totalHeight = 2 * keySize + padding;
    const startX = (canvas.width - totalWidth) / 2;
    const startY = (canvas.height - totalHeight) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const keys = [
      { key: 'ArrowUp', x: startX + keySize + padding, y: startY },
      { key: 'ArrowLeft', x: startX, y: startY + keySize + padding },
      {
        key: 'ArrowDown',
        x: startX + keySize + padding,
        y: startY + keySize + padding,
      },
      {
        key: 'ArrowRight',
        x: startX + 2 * (keySize + padding),
        y: startY + keySize + padding,
      },
    ];

    keys.forEach((key) => {
      ctx.fillStyle = pressedKey.current === key.key ? '#ff4d4d' : '#ddd';
      ctx.fillRect(key.x, key.y, keySize, keySize);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(key.x, key.y, keySize, keySize);
      ctx.fillStyle = '#333';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const arrowSymbol = {
        ArrowUp: '↑',
        ArrowLeft: '←',
        ArrowDown: '↓',
        ArrowRight: '→',
      }[key.key];

      ctx.fillText(arrowSymbol || '', key.x + keySize / 2, key.y + keySize / 2);
    });
  };

  const getPressedKeyFromTouch = (touchX: number, touchY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const keySize = 70;
    const padding = 10;
    const totalWidth = 3 * keySize + 2 * padding;
    const totalHeight = 2 * keySize + padding;
    const startX = (canvas.width - totalWidth) / 2;
    const startY = (canvas.height - totalHeight) / 2;

    const keys = [
      { key: 'ArrowUp', x: startX + keySize + padding, y: startY },
      { key: 'ArrowLeft', x: startX, y: startY + keySize + padding },
      {
        key: 'ArrowDown',
        x: startX + keySize + padding,
        y: startY + keySize + padding,
      },
      {
        key: 'ArrowRight',
        x: startX + 2 * (keySize + padding),
        y: startY + keySize + padding,
      },
    ];

    for (let key of keys) {
      if (
        touchX >= key.x &&
        touchX <= key.x + keySize &&
        touchY >= key.y &&
        touchY <= key.y + keySize
      ) {
        return key.key;
      }
    }
    return null;
  };

  useEffect(() => {
    drawArrowKeys();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        pressedKey.current = event.key;
        drawArrowKeys();
      }
    };

    const handleKeyUp = () => {
      pressedKey.current = null;
      drawArrowKeys();
    };

    const handleTouchStart = (event: TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;

      const key = getPressedKeyFromTouch(touchX, touchY);
      if (key) {
        pressedKey.current = key;
        drawArrowKeys();
      }
    };

    const handleTouchEnd = () => {
      pressedKey.current = null;
      drawArrowKeys();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvasRef.current?.addEventListener('touchstart', handleTouchStart);
    canvasRef.current?.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvasRef.current?.removeEventListener('touchstart', handleTouchStart);
      canvasRef.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={250}
      height={250}
      style={{ display: 'block', margin: '0 auto', touchAction: 'none' }}
    />
  );
};

export default ArrowKeysCanvas;
