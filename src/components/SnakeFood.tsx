import Apple from './foodItems/Apple';

const FoodTypes = [Apple];

const SnakeFood = {
  draw: (
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number },
    scale: number
  ) => {
    const randomFood = FoodTypes[Math.floor(Math.random() * FoodTypes.length)];
    randomFood.draw(
      ctx,
      position.x * scale + scale / 2,
      position.y * scale + scale / 2,
      scale
    );
  },
};

export default SnakeFood;
