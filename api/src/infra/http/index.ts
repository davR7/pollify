import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Router } from "express";
import helmet from "helmet";
import { httpLogger, logger } from "../config/logging";
import { CatchAllMiddleware } from "./middlewares/catch-all.middleware";
import { NotFoundMiddleware } from "./middlewares/not-found.middleware";

class App {
  private app: Application = express();

  constructor(private router: Router = Router()) {
    this.setupLoaders();
    this.setupRoutes();
    this.setupErrHandler();
  }

  private setupLoaders() {
    this.app.use(httpLogger);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      }),
    );
    this.app.use(helmet());
  }

  private setupRoutes() {
    this.app.get("/test-error", (req, res) => {
      throw new Error("Erro interno simulado");
    });
    this.app.use(this.router);
  }

  private setupErrHandler() {
    this.app.use(NotFoundMiddleware);
    this.app.use(CatchAllMiddleware);
  }

  listen(port: number) {
    this.app.listen(port, () => {
      logger.info(`HTTP Server running at ${port}`);
    });
  }
}

export { App };
