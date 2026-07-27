import { Request, Response, Router } from "express";
import { CreatePollController } from "@/controllers/create-poll.controller";
import { CreateVoteController } from "@/controllers/create-vote.controller";
import { DeletePollController } from "@/controllers/delete-poll.controller";
import { ListAvailablePollController } from "@/controllers/list-available-poll.controller";
import { ListPollController } from "@/controllers/list-poll.controller";
import { UpdatePollController } from "@/controllers/update-poll.controller";
import { UserRole } from "@/entities/user/user-role";
import { container } from "@/infra/container";
import { createPollSchema } from "@/schemas/create-poll.schema";
import { deletePollSchema } from "@/schemas/delete-poll.schema";
import { updatePollSchema } from "@/schemas/update-poll.schema";
import { votePollSchema } from "@/schemas/vote-poll.schema";
import authMiddleware from "../middlewares/auth.middleware";
import ensureAdmin from "../middlewares/ensure-admin.middleware";
import { zodValidatorMiddleware } from "../middlewares/zod-validator.middleware";

const createPoll = new CreatePollController(container.getCreatePollUseCase());
const createVote = new CreateVoteController(container.getCreateVoteUseCase());
const listPoll = new ListPollController(container.getListPollUseCase());
const listAvailablePoll = new ListAvailablePollController(container.getListAvailablePollUseCase());
const updatePoll = new UpdatePollController(container.getUpdatePollUseCase());
const delPoll = new DeletePollController(container.getDeletePollUseCase());

export default (router: Router) => {
  router.post(
    "/polls",
    authMiddleware,
    zodValidatorMiddleware("body", createPollSchema),
    async (req: Request, res: Response) => {
      await createPoll.handler(req, res);
    },
  );
  router.get("/polls", authMiddleware, async (req: Request, res: Response) => {
    await listAvailablePoll.handler(req, res);
  });
  router.get(
    "/admin/polls",
    authMiddleware,
    ensureAdmin([UserRole.ADMIN]),
    async (req: Request, res: Response) => {
      await listPoll.handler(req, res);
    },
  );
  router.patch(
    "/polls/:id",
    authMiddleware,
    zodValidatorMiddleware("body", updatePollSchema),
    async (req: Request, res: Response) => {
      await updatePoll.handler(req, res);
    },
  );
  router.delete(
    "/polls/:id",
    authMiddleware,
    zodValidatorMiddleware("params", deletePollSchema),
    async (req: Request, res: Response) => {
      await delPoll.handler(req, res);
    },
  );
  router.post(
    "/polls/:pollId/votes",
    authMiddleware,
    zodValidatorMiddleware("body", votePollSchema),
    async (req: Request, res: Response) => {
      await createVote.handler(req, res);
    },
  );
};
