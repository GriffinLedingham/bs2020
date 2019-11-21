import {
  EMPTY_TILE,
  SNAKE_HEAD,
  SNAKE_BODY,
  SNAKE_TAIL,
  FOOD_TILE
} from "../types/Board";
import Vector2 from "../util/Vector2";

export default (
  x: number,
  y: number,
  isPlayer: boolean,
  snakeId: string,
  snakeLength: number,
  height: number,
  width: number,
  foods: Array<Vector2>,
  grid: Array<Array<number>>,
  floodGrid: Array<Array<FloodTile>>
): Array<Array<FloodTile>> => {
  grid[x][y] = EMPTY_TILE;

  for (let i = 0, foodsLength = foods.length; i < foodsLength; i++) {
    const food = foods[i];
    grid[food.get("x")][food.get("y")] = EMPTY_TILE;
  }

  floodFillQueue(
    grid,
    floodGrid,
    x,
    y,
    height,
    width,
    EMPTY_TILE,
    99,
    isPlayer,
    snakeId,
    snakeLength
  );

  return floodGrid;
};

function floodFillQueue(
  grid: Array<Array<number>>,
  floodGrid: Array<Array<FloodTile>>,
  x: number,
  y: number,
  height: number,
  width: number,
  oldVal: number,
  newVal: number,
  isPlayer: boolean,
  snakeId: string,
  snakeLength: number
): void {
  let hits = new Array(height)
      .fill(false)
      .map(() => new Array(width).fill(false)),
    queue = new CircularBuffer(height * width);
  queue.push([x, y, 0]);
  while (!queue.isEmpty()) {
    let p = queue.shift();
    if (
      floodFillDo(
        grid,
        floodGrid,
        hits,
        p[0],
        p[1],
        p[2],
        oldVal,
        newVal,
        isPlayer,
        snakeId,
        snakeLength,
        height,
        width
      )
    ) {
      queue.push([p[0], p[1] - 1, p[2] + 1]);
      queue.push([p[0], p[1] + 1, p[2] + 1]);
      queue.push([p[0] - 1, p[1], p[2] + 1]);
      queue.push([p[0] + 1, p[1], p[2] + 1]);
    }
  }
}

function floodFillDo(
  grid: Array<Array<number>>,
  floodGrid: Array<Array<FloodTile>>,
  hits: Array<Array<boolean>>,
  x: number,
  y: number,
  distance: number,
  oldVal: number,
  newVal: number,
  isPlayer: boolean,
  snakeId: string,
  snakeLength: number,
  height: number,
  width: number
): boolean {
  if (y < 0 || x < 0) return false;
  if (y > height - 1 || x > width - 1) return false;
  if (hits[x][y]) return false;
  if (grid[x][y] != oldVal) return false;
  if (distance < floodGrid[x][y]["ownerDist"]) {
    floodGrid[x][y].owner = snakeId;
    floodGrid[x][y].ownerDist = distance;
    floodGrid[x][y].longest = snakeLength;
  } else if (distance == floodGrid[x][y]["ownerDist"]) {
    if (snakeLength > floodGrid[x][y]["ownerDist"]) {
      floodGrid[x][y].owner = snakeId;
      floodGrid[x][y].ownerDist = distance;
      floodGrid[x][y].longest = snakeLength;
    }
  }
  if (isPlayer && floodGrid[x][y].dist > distance) {
    floodGrid[x][y].dist = distance;
  }
  grid[x][y] = newVal;
  hits[x][y] = true;
  return true;
}

class CircularBuffer {
  public memory: Array<Array<number>>;
  public head: number;
  public tail: number;
  public isFull: boolean;
  constructor(size: number) {
    this.memory = new Array(size);
    this.head = 0;
    this.tail = 0;
    this.isFull = false;
  }

  isEmpty(): boolean {
    return this.tail === this.head && !this.isFull;
  }

  shift() {
    if (this.tail === this.head && !this.isFull) {
      console.log("Nothing to read.");
    } else {
      this.tail = this.next(this.tail);
      this.isFull = false;
      return this.memory[this.tail];
    }
  }

  push(value: Array<number>) {
    if (this.isFull) {
      console.error("Buffer full");
      return;
    } else {
      this.head = this.next(this.head);
      this.memory[this.head] = value;
      if (this.head === this.tail) {
        this.isFull = true;
      }
    }
  }

  next(n: number): number {
    var nxt = n + 1;
    if (nxt === this.memory.length) {
      return 0;
    } else {
      return nxt;
    }
  }
}
