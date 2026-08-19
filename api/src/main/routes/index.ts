import { Router } from "express";
import healthRouter from "./v1/health.router";
import authRouter from "./v1/auth.router";
import pollRouter from "./v1/poll.router";

const router = Router();

healthRouter(router);
authRouter(router);
pollRouter(router);

export { router };
