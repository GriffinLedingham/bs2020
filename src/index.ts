import App from "./App";

// TODO: Pass this in from a .env
const port = 5001;

const app = new App(port);

process.on("SIGINT", () => process.exit());
