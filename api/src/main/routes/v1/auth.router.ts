import { Request, Response, Router } from "express";
import { CreateUserController } from "@/controllers/create-user.controller";
import { LoginUserController } from "@/controllers/login-user.controller";
import { container } from "@/infra/container";
import { signinSchema } from "@/schemas/signin.schema";
import { signupSchema } from "@/schemas/signup.schema";
import { zodValidatorMiddleware } from "../middlewares/zod-validator.middleware";

const createUser = new CreateUserController(container.getCreateUserUseCase());
const loginUser = new LoginUserController(container.getLoginUserUseCase());

export default (router: Router) => {
  router.post(
    "/signup",
    zodValidatorMiddleware("body", signupSchema),
    async (req: Request, res: Response) => {
      await createUser.handler(req, res);
    },
  );
  router.post(
    "/signin",
    zodValidatorMiddleware("body", signinSchema),
    async (req: Request, res: Response) => {
      await loginUser.handler(req, res);
    },
  );
};
