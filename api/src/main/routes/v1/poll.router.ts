import { Request, Response, Router } from "express";
import { CreatePollController } from "@/controllers/create-poll.controller";
import { CreateVoteController } from "@/controllers/create-vote.controller";
import { UpdatePollController } from "@/controllers/update-poll.controller";
import { DeletePollController } from "@/controllers/delete-poll.controller";
import { ListPollController } from "@/controllers/list-poll.controller";
import { container } from "@/infra/container";
import authMiddleware from "../middlewares/auth.middleware";

const createPoll = new CreatePollController(container.getCreatePollUseCase());
const createVote = new CreateVoteController(container.getCreateVoteUseCase());
const listPoll = new ListPollController(container.getListPollUseCase());
const updatePoll = new UpdatePollController(container.getUpdatePollUseCase());
const delPoll = new DeletePollController(container.getDeletePollUseCase());

export default (router: Router) => {
  router.post("/polls", authMiddleware, async (req: Request, res: Response) => {
    await createPoll.handler(req, res);
  });
  router.get("/polls", authMiddleware, async (req: Request, res: Response) => {
    await listPoll.handler(req, res);
  });
  router.patch("/polls/:id", authMiddleware, async (req: Request, res: Response) => {
    await updatePoll.handler(req, res);
  });
  router.delete("/polls/:id", authMiddleware, async (req: Request, res: Response) => {
    await delPoll.handler(req, res);
  });
  router.post("/polls/:pollId/votes", authMiddleware, async (req: Request, res: Response) => {
    await createVote.handler(req, res);
  });
};
