interface StartResponse {
  color: string;
  headType: string;
  tailType: string;
}

interface MoveResponse {
  move: string;
}

interface GamePayload {
  game: { id: string };
  turn: number;
  board: BoardPayload;
  you: SnakePayload;
}

interface BoardPayload {
  height: number;
  width: number;
  food: Array<{ x: number; y: number }>;
  snakes: Array<SnakePayload>;
}

interface SnakePayload {
  id: string;
  name: string;
  health: number;
  body: Array<{ x: number; y: number }>;
}
