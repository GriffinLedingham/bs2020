import {
  EMPTY_TILE,
  SNAKE_BODY,
  SNAKE_HEAD,
  SNAKE_TAIL,
  FOOD_TILE
} from "../types/Board";

class Board {
  private height: number;
  private width: number;
  private grid: Array<Array<number>>;

  constructor(data?: GamePayload) {
    if (data !== undefined) {
      this.height = data.board.height;
      this.width = data.board.width;

      this.resetBoard(data);
      this.fromState(data);
    }
  }

  resetBoard(data: GamePayload) {
    this.grid = [];
    for (let i = 0, mapWidth = this.width; i < mapWidth; i++) {
      const column = [];
      for (let j = 0, mapHeight = this.height; j < mapHeight; j++) {
        column.push(EMPTY_TILE);
      }
      this.grid.push(column);
    }
  }

  fromState(data: GamePayload) {
    const snakes = data.board.snakes;
    for (let i = 0, snakeLength = snakes.length; i < snakeLength; i++) {
      const snake = snakes[i];
      // Get the snake's head
      const body = snake.body;
      const length = body.length;
      const head = body[0];
      const tail = body[length - 1];
      this.set(SNAKE_HEAD, head.x, head.y);
      this.set(SNAKE_TAIL, tail.x, tail.y);

      if (length > 2) {
        for (let j = 1, bodyLength = length - 1; j < bodyLength; j++) {
          const bodySegment = body[j];
          this.set(SNAKE_BODY, bodySegment.x, bodySegment.y);
        }
      }
    }

    const foods = data.board.food;
    for (let i = 0, foodsLength = foods.length; i < foodsLength; i++) {
      const food = foods[i];
      this.set(FOOD_TILE, food.x, food.y);
    }
  }

  get(x: number, y: number): number {
    return this.grid[x][y];
  }

  set(value: number, x: number, y: number): void {
    this.grid[x][y] = value;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  setGrid(grid: Array<Array<number>>) {
    this.grid = grid;
  }

  print(): void {
    console.log(
      this.grid[0].map((col, i) => {
        return this.grid.map(row => {
          return row[i];
        });
      })
    );
  }

  clone(): Board {
    const cloneBoard = new Board();

    const cloneGrid = [];
    for (let i = 0, mapWidth = this.width; i < mapWidth; i++) {
      const column = [];
      for (let j = 0, mapHeight = this.height; j < mapHeight; j++) {
        column.push(this.grid[i][j]);
      }
      cloneGrid.push(column);
    }

    cloneBoard.setHeight(this.height);
    cloneBoard.setWidth(this.width);
    cloneBoard.setGrid(cloneGrid);

    return cloneBoard;
  }
}

export default Board;
