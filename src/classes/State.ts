import Board from "./Board";
import Snake from "./Snake";
import Vector2 from "../util/Vector2";

class State {
  private board: Board;
  private snakes: { [key: string]: Snake };
  private food: Array<Vector2>;

  private playerId: string;

  /**
   * Construct a game state based on a data payload from the server. If no payload is
   * passed in, just construct an empty state instance.
   *
   * @param payload Data payload to build state off of
   */
  constructor(payload?: GamePayload) {
    // Instantiating from a data payload
    if (payload !== undefined) {
      this.playerId = payload.you.id;

      this.board = new Board(payload);

      this.food = [];
      const foods = payload.board.food;
      for (let i = 0, foodsLength = foods.length; i < foodsLength; i++) {
        const food = foods[i];
        this.food.push(new Vector2(food.x, food.y));
      }

      this.snakes = {};
      const snakes = payload.board.snakes;
      for (let i = 0, snakesLength = snakes.length; i < snakesLength; i++) {
        const snake = snakes[i];
        this.snakes[snake.id] = new Snake(snake);
        this.floodBoard(this.snakes[snake.id]);
      }
    }
  }

  getPlayerDistance(x: number, y: number): number {
    return this.board.getPlayerDistance(x, y);
  }

  floodBoard(snake: Snake) {
    this.board.flood(snake, snake.getId() === this.playerId, this.food);
  }

  setSnakes(snakes: { [key: string]: Snake }): void {
    this.snakes = snakes;
  }

  setFood(foods: Array<Vector2>): void {
    this.food = foods;
  }

  setBoard(board: Board): void {
    this.board = board;
  }

  clone() {
    // Create a new empty state instance
    const stateClone: State = new State();

    const cloneSnakes = {};
    const keys = Object.keys(this.snakes);
    for (let i = 0, keysLength = keys.length; i < keysLength; i++) {
      const snake = this.snakes[keys[i]];
      cloneSnakes[snake.getId()] = snake.clone();
    }
    stateClone.setSnakes(cloneSnakes);

    const cloneFood = [];
    for (let i = 0, foodsLength = this.food.length; i < foodsLength; i++) {
      const food = this.food[i];
      cloneFood.push(new Vector2(food.get("x"), food.get("y")));
    }
    stateClone.setFood(cloneFood);

    stateClone.setBoard(this.board.clone());

    return;
  }
}

export default State;
