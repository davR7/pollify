import express, { Application } from "express";

class App {
  private app: Application = express();

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`HTTP Server running at ${port}`);
    });
  }
}

export { App };
