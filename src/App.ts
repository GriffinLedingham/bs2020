import * as http from "http";
import State from "./classes/State";

class App {
  private server: http.Server;

  constructor(port: number) {
    this.startServer(port);
  }

  startServer(port: number) {
    this.server = http.createServer(
      (req: http.IncomingMessage, res: http.ServerResponse) => {
        // Return if the request ins't a POST request
        if (req.method !== "POST") return this.respond(res);

        // Initialize request variables to work with
        const body = [];
        let payload: GamePayload = null;
        let message = {};

        // Push to buffer array as data comes in from the request
        req.on("data", chunk => body.push(chunk));

        // When data finishes, hit the appropriate method
        req.on("end", () => {
          if (body.length === 0) {
            res.end();
            return;
          }
          try {
            if (req.url === "/end") message = {};
            if (req.url === "/ping") message = {};

            // Parse out the request buffer into JSON
            payload = this.formatAPIData(
              JSON.parse(Buffer.concat(body).toString())
            );

            // Hit the appropriate start or move method
            if (req.url === "/start") message = this.start(payload);
            if (req.url === "/move") message = this.move(payload);
          } catch (e) {
            console.log(e);
          }
          return this.respond(res, message);
        });
      }
    );

    this.server.listen(port);
    console.log(`Server listening on port ${port}...`);
  }

  getServer(): http.Server {
    return this.server;
  }

  respond(res: http.ServerResponse, message: { move?: string } = {}) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(message));
  }

  start(payload: GamePayload): StartResponse {
    return { color: "#FF0000", headType: "beluga", tailType: "regular" };
  }

  move(payload: GamePayload): MoveResponse {
    if (payload === null) return { move: "up" };

    const state = new State(payload);

    return { move: "up" };
  }

  // Format input data to the 2019 API standard
  formatAPIData(data): GamePayload {
    if (Object.keys(data).length === 0) return null;
    if (!data.hasOwnProperty("board")) {
      data.board = {};
      data.board["height"] = data.height;
      data.board["width"] = data.width;
      data.board["food"] = data.food.data;
      data.board["snakes"] = data.snakes.data;
      for (let i = 0; i < data.board.snakes.length; i++) {
        data.board.snakes[i]["body"] = data.board.snakes[i]["body"]["data"];
      }
      delete data["height"];
      delete data["width"];
      delete data["food"];
      delete data["snakes"];
    }
    return data;
  }
}

export default App;
