import { Request, Response, Router } from "express";
import { CreatePollController } from "@/controllers/create-poll.controller";
import { container } from "@/infra/container";
import authMiddleware from "../middlewares/auth.middleware";

const createPoll = new CreatePollController(container.getCreatePollUseCase());

export default (router: Router) => {
  router.post("/polls", authMiddleware, (req: Request, res: Response) => {
    createPoll.handler(req, res);
  });
};
