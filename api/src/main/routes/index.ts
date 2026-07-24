import { Router } from "express";
import authRouter from "./v1/auth.router";
import pollRouter from "./v1/poll.router";

const router = Router();

authRouter(router);
pollRouter(router);

export { router };
