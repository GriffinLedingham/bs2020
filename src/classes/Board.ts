import {
  EMPTY_TILE,
  SNAKE_BODY,
  SNAKE_HEAD,
  SNAKE_TAIL,
  FOOD_TILE
} from "../types/Board";
import Snake from "./Snake";
import Floodfill from "./Floodfill";
import Vector2 from "../util/Vector2";

class Board {
  private height: number;
  private width: number;
  private grid: Array<Array<number>>;

  // Object of flood grids per snake, for re-use
  private floodGrid: Array<Array<FloodTile>>;

  constructor(data?: GamePayload) {
    this.floodGrid = null;
    if (data !== undefined) {
      this.height = data.board.height;
      this.width = data.board.width;

      this.grid = this.resetGrid();
      this.floodGrid = this.resetFloodGrid();

      this.fromPayload(data);
    }
  }

  resetGrid(): Array<Array<number>> {
    const grid = [];
    for (let i = 0, mapWidth = this.width; i < mapWidth; i++) {
      const column = [];
      for (let j = 0, mapHeight = this.height; j < mapHeight; j++) {
        column.push(EMPTY_TILE);
      }
      grid.push(column);
    }

    return grid;
  }

  resetFloodGrid(): Array<Array<FloodTile>> {
    const grid = [];
    for (let i = 0, mapWidth = this.width; i < mapWidth; i++) {
      const column = [];
      for (let j = 0, mapHeight = this.height; j < mapHeight; j++) {
        column.push({
          longest: -1,
          owner: "",
          ownerDist: Infinity,
          dist: Infinity
        });
      }
      grid.push(column);
    }

    return grid;
  }

  fromPayload(data: GamePayload) {
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

  flood(snake: Snake, isPlayer: boolean, food: Array<Vector2>) {
    const head = snake.getHead();

    this.floodGrid = Floodfill(
      head.get("x"),
      head.get("y"),
      isPlayer,
      snake.getId(),
      snake.getLength(),
      this.height,
      this.width,
      food,
      this.cloneGrid(),
      this.floodGrid
    );
  }

  getPlayerDistance(x: number, y: number) {
    const dist = this.floodGrid[x][y].dist;
    if (dist === Infinity) return null;
    return dist;
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

  setFloodGrid(floodGrid: Array<Array<FloodTile>>) {
    this.floodGrid = floodGrid;
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

  printFlood(snake: Snake): void {
    console.log(
      this.floodGrid[0].map((col, i) => {
        return this.floodGrid.map(row => {
          if (row[i].dist === Infinity) return "*";
          return row[i].dist.toString();
        });
      })
    );
  }

  printVoronoi(snake: Snake): void {
    console.log(
      this.floodGrid[0].map((col, i) => {
        return this.floodGrid.map(row => {
          if (row[i].owner == snake.getId()) {
            return "o";
          } else return ".";
        });
      })
    );
  }

  cloneGrid(): Array<Array<number>> {
    const cloneGrid = [];
    for (let i = 0, mapWidth = this.width; i < mapWidth; i++) {
      const column = [];
      for (let j = 0, mapHeight = this.height; j < mapHeight; j++) {
        column.push(this.grid[i][j]);
      }
      cloneGrid.push(column);
    }

    return cloneGrid;
  }

  cloneFloodGrid(): Array<Array<FloodTile>> {
    const cloneFloodGrid = [];
    for (let i = 0, mapWidth = this.width; i < mapWidth; i++) {
      const column = [];
      for (let j = 0, mapHeight = this.height; j < mapHeight; j++) {
        const tileData = this.floodGrid[i][j];
        column.push({
          longest: tileData.longest,
          owner: tileData.owner,
          ownerDist: tileData.ownerDist
        });
      }
      cloneFloodGrid.push(column);
    }

    return cloneFloodGrid;
  }

  clone(): Board {
    const cloneBoard = new Board();

    cloneBoard.setHeight(this.height);
    cloneBoard.setWidth(this.width);
    cloneBoard.setGrid(this.cloneGrid());
    cloneBoard.setFloodGrid(this.cloneFloodGrid());

    return cloneBoard;
  }
}

export default Board;
