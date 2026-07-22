import { Request, Response, Router } from "express";
import { CreateUserController } from "@/controllers/create-user.controller";
import { container } from "@/infra/container";

const createUser = new CreateUserController(container.getCreateUserUseCase());

export default (router: Router) => {
  router.post("/signup", (req: Request, res: Response) => {
    createUser.handler(req, res);
  });
};
