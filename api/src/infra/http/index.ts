import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

class App {
  private app: Application = express();

  constructor() {
    this.setupLoaders();
  }

  private setupLoaders() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`HTTP Server running at ${port}`);
    });
  }
}

export { App };
