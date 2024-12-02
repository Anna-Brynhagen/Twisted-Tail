import Apple from './foodItems/Apple';
import Banana from './foodItems/Banana';
import Mouse from './foodItems/Mouse';

const FoodTypes = [Apple, Banana, Mouse];
let currentFoodType = FoodTypes[0];

const SnakeFood = {
  generateNewFood: () => {
    currentFoodType = FoodTypes[Math.floor(Math.random() * FoodTypes.length)];
  },
  draw: (
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number },
    scale: number
  ) => {
    currentFoodType.draw(
      ctx,
      position.x * scale + scale / 2,
      position.y * scale + scale / 2,
      scale
    );
  },
};

export default SnakeFood;
