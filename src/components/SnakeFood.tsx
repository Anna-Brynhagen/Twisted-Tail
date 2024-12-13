import Apple from './foodItems/Apple';
import Banana from './foodItems/Banana';
import Mouse from './foodItems/Mouse';
import GreenApple from './foodItems/GreenApple';
import BrownMouse from './foodItems/BrownMouse';

const FoodTypes = [Apple, Banana, Mouse, GreenApple, BrownMouse];
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
