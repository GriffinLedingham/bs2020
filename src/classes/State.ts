import Board from "./Board";
import Snake from "./Snake";

class State {
  private payload;
  private board: Board;
  private snakes: { [key: string]: Snake };

  /**
   * Construct a game state based on a data payload from the server. If no payload is
   * passed in, just construct an empty state instance.
   *
   * @param payload Data payload to build state off of
   */
  constructor(payload?: GamePayload) {
    // Instantiating from a data payload
    if (payload !== undefined) {
      this.board = new Board(payload);
    }
  }

  setSnakes(snakes: { [key: string]: Snake }): void {
    this.snakes = snakes;
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

    stateClone.setBoard(this.board.clone());

    return;
  }
}

export default State;
