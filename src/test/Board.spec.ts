import { expect } from "chai";
import App from "../App";
import Board from "../classes/Board";
import BoardStub from "./BoardStub";

/**
 * Test app behaviour spin up/tear down
 */
describe("Board", () => {
  /**
   * Test the app running and listening on ports
   */
  describe("Clone", () => {
    it("Should clone the board and not equal", () => {
      const board1 = new Board(BoardStub);
      const board2 = new Board(BoardStub);
      expect(board1).to.not.equal(board2);
    });
    it("Should clone the board and deep equal", () => {
      const board1 = new Board(BoardStub);
      const board2 = new Board(BoardStub);
      expect(board1).to.deep.equal(board2);
    });
  });
});
