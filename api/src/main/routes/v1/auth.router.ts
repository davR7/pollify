import { Request, Response, Router } from "express";
import { CreateUserController } from "@/controllers/sign-up.controller";
import { GetCurrentUserController } from "@/controllers/get-current-user.controller";
import { SignInController } from "@/controllers/sign-in.controller";
import { container } from "@/infra/container";
import { signinSchema } from "@/schemas/signin.schema";
import { signupSchema } from "@/schemas/signup.schema";
import authMiddleware from "../middlewares/auth.middleware";
import { zodValidatorMiddleware } from "../middlewares/zod-validator.middleware";

const signUpUseCase = new CreateUserController(container.getSignUpUseCase());
const signInController = new SignInController(container.getSignInUseCase());
const currentUser = new GetCurrentUserController(container.getCurrentUserUseCase());

export default (router: Router) => {
  router.post(
    "/auth/signup",
    zodValidatorMiddleware("body", signupSchema),
    async (req: Request, res: Response) => {
      await signUpUseCase.handler(req, res);
    },
  );
  router.post(
    "/auth/signin",
    zodValidatorMiddleware("body", signinSchema),
    async (req: Request, res: Response) => {
      await signInController.handler(req, res);
    },
  );
  router.get("/auth/me", authMiddleware, async (req: Request, res: Response) => {
    await currentUser.handler(req, res);
  });
};
