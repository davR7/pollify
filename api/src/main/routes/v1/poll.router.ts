import { Request, Response, Router } from "express";
import { CreatePollController } from "@/controllers/create-poll.controller";
import { CreateVoteController } from "@/controllers/create-vote.controller";
import { DeletePollController } from "@/controllers/delete-poll.controller";
import { GetPollWithUserVoteController } from "@/controllers/get-poll-with-user-vote.controller";
import { ListAvailablePollController } from "@/controllers/list-available-poll.controller";
import { ListPollController } from "@/controllers/list-poll.controller";
import { ListPollUserController } from "@/controllers/list-poll-user.controller";
import { UpdatePollController } from "@/controllers/update-poll.controller";
import { UserRole } from "@/entities/user/user-role";
import { container } from "@/infra/container";
import { JwtTokenProvider } from "@/infra/security/jwt-token-provider";
import { createPollSchema } from "@/schemas/create-poll.schema";
import { deletePollSchema } from "@/schemas/delete-poll.schema";
import { updatePollSchema } from "@/schemas/update-poll.schema";
import { votePollSchema } from "@/schemas/vote-poll.schema";
import authMiddleware from "../middlewares/auth.middleware";
import ensureAdmin from "../middlewares/ensure-admin.middleware";
import { zodValidatorMiddleware } from "../middlewares/zod-validator.middleware";

const jwtTokenProvider = new JwtTokenProvider(
  process.env.ACCESS_TOKEN_SECRET,
  process.env.REFRESH_TOKEN_SECRET,
);
const createPoll = new CreatePollController(container.getCreatePollUseCase());
const listPoll = new ListPollController(container.getListPollUseCase());
const listAvailablePoll = new ListAvailablePollController(container.getListAvailablePollUseCase());
const listPollUser = new ListPollUserController(container.getListPollUserUseCase());
const updatePoll = new UpdatePollController(container.getUpdatePollUseCase());
const delPoll = new DeletePollController(container.getDeletePollUseCase());
const createVote = new CreateVoteController(container.getCreateVoteUseCase());
const getPollWithUserVote = new GetPollWithUserVoteController(
  container.getPollWithUserVoteUseCase(),
);

export default (router: Router) => {
  router.post(
    "/polls",
    authMiddleware(jwtTokenProvider),
    zodValidatorMiddleware("body", createPollSchema),
    async (req: Request, res: Response) => {
      await createPoll.handler(req, res);
    },
  );
  router.get("/me/polls", authMiddleware(jwtTokenProvider), async (req: Request, res: Response) => {
    await listPollUser.handler(req, res);
  });
  router.get("/polls", authMiddleware(jwtTokenProvider), async (req: Request, res: Response) => {
    await listAvailablePoll.handler(req, res);
  });
  router.get(
    "/admin/polls",
    authMiddleware(jwtTokenProvider),
    ensureAdmin([UserRole.ADMIN]),
    async (req: Request, res: Response) => {
      await listPoll.handler(req, res);
    },
  );
  router.patch(
    "/polls/:id",
    authMiddleware(jwtTokenProvider),
    zodValidatorMiddleware("body", updatePollSchema),
    async (req: Request, res: Response) => {
      await updatePoll.handler(req, res);
    },
  );
  router.delete(
    "/polls/:id",
    authMiddleware(jwtTokenProvider),
    zodValidatorMiddleware("params", deletePollSchema),
    async (req: Request, res: Response) => {
      await delPoll.handler(req, res);
    },
  );
  router.get(
    "/polls/:pollId/votes",
    authMiddleware(jwtTokenProvider),
    async (req: Request, res: Response) => {
      await getPollWithUserVote.handler(req, res);
    },
  );
  router.post(
    "/polls/:pollId/votes",
    authMiddleware(jwtTokenProvider),
    zodValidatorMiddleware("body", votePollSchema),
    async (req: Request, res: Response) => {
      await createVote.handler(req, res);
    },
  );
};
