import { Request, Response, Router } from "express";
import { CreateUserController } from "@/controllers/create-user.controller";
import { LoginUserController } from "@/controllers/login-user.controller";
import { container } from "@/infra/container";

const createUser = new CreateUserController(container.getCreateUserUseCase());
const loginUser = new LoginUserController(container.getLoginUserUseCase());

export default (router: Router) => {
  router.post("/signup", async (req: Request, res: Response) => {
    await createUser.handler(req, res);
  });
  router.post("/signin", async (req: Request, res: Response) => {
    await loginUser.handler(req, res);
  });
};
