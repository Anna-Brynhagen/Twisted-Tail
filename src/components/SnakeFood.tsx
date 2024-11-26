export interface FoodProps {
  position: { x: number; y: number };
  scale: number;
}

const Food: React.FC<FoodProps> = ({ position, scale }) => {
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(position.x * scale, position.y * scale, scale, scale);
  };

  return <>{draw}</>;
};

export default Food;
