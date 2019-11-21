import { expect } from "chai";
import App from "../App";

/**
 * Test app behaviour spin up/tear down
 */
describe("App", () => {
  /**
   * Test the app running and listening on ports
   */
  describe("Run", () => {
    it("Should listen on port 3000, and close http server", () => {
      const app = new App(3000)
      const server = app.getServer();
      expect(server.close()).to.be.an('object')
    });
  });
});
