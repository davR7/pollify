import { Request, Response, Router } from "express";
import { CreatePollController } from "@/controllers/create-poll.controller";
import { CreateVoteController } from "@/controllers/create-vote.controller";
import { DeletePollController } from "@/controllers/delete-poll.controller";
import { ListPollController } from "@/controllers/list-poll.controller";
import { container } from "@/infra/container";
import authMiddleware from "../middlewares/auth.middleware";

const createPoll = new CreatePollController(container.getCreatePollUseCase());
const createVote = new CreateVoteController(container.getCreateVoteUseCase());
const listPoll = new ListPollController(container.getListPollUseCase());
const delPoll = new DeletePollController(container.getDeletePollUseCase());

export default (router: Router) => {
  router.post("/polls", authMiddleware, (req: Request, res: Response) => {
    createPoll.handler(req, res);
  });
  router.post("/polls/:pollId/votes", authMiddleware, (req: Request, res: Response) => {
    createVote.handler(req, res);
  });
  router.get("/polls", authMiddleware, (req: Request, res: Response) => {
    listPoll.handler(req, res);
  });
  router.delete("/polls/:id", authMiddleware, (req: Request, res: Response) => {
    delPoll.handler(req, res);
  });
};
