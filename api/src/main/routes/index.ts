import { Router } from "express";
import authRouter from "./v1/auth.router";

const router = Router();

authRouter(router);

export { router };
