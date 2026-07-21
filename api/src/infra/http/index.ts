import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import { CatchAllMiddleware } from "./middlewares/catch-all.middleware";
import { NotFoundMiddleware } from "./middlewares/not-found.middleware";

class App {
  private app: Application = express();

  constructor() {
    this.setupLoaders();
    this.setupErrHandler();
  }

  private setupLoaders() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
  }

  private setupErrHandler() {
    this.app.use(NotFoundMiddleware);
    this.app.use(CatchAllMiddleware);
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`HTTP Server running at ${port}`);
    });
  }
}

export { App };
