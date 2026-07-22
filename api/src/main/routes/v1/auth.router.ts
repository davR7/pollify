import { Request, Response, Router } from "express";
import { CreateUserController } from "@/controllers/create-user.controller";
import { LoginUserController } from "@/controllers/login-user.controller";
import { container } from "@/infra/container";

const createUser = new CreateUserController(container.getCreateUserUseCase());
const loginUser = new LoginUserController(container.getLoginUserUseCase());

export default (router: Router) => {
  router.post("/signup", (req: Request, res: Response) => {
    createUser.handler(req, res);
  });
  router.post("/signin", (req: Request, res: Response) => {
    loginUser.handler(req, res);
  });
};
