import { Request, Response, Router } from "express";
import { GetCurrentUserController } from "@/controllers/get-current-user.controller";
import { LogoutController } from "@/controllers/logout.controller";
import { RefreshTokenController } from "@/controllers/refresh-token.controller";
import { SignInController } from "@/controllers/sign-in.controller";
import { CreateUserController } from "@/controllers/sign-up.controller";
import { container } from "@/infra/container";
import { JwtTokenProvider } from "@/infra/security/jwt-token-provider";
import { signinSchema } from "@/schemas/signin.schema";
import { signupSchema } from "@/schemas/signup.schema";
import authMiddleware from "../middlewares/auth.middleware";
import { zodValidatorMiddleware } from "../middlewares/zod-validator.middleware";

const jwtTokenProvider = new JwtTokenProvider(
  process.env.ACCESS_TOKEN_SECRET,
  process.env.REFRESH_TOKEN_SECRET,
);
const signUpUseCase = new CreateUserController(container.getSignUpUseCase());
const signInController = new SignInController(container.getSignInUseCase());
const refreshToken = new RefreshTokenController(container.getRefreshTokenUseCase());
const logout = new LogoutController();
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
  router.post("/auth/refresh", async (req: Request, res: Response) => {
    await refreshToken.handler(req, res);
  });
  router.post("/auth/logout", async (req: Request, res: Response) => {
    await logout.handler(req, res);
  });
  router.get("/auth/me", authMiddleware(jwtTokenProvider), async (req: Request, res: Response) => {
    await currentUser.handler(req, res);
  });
};
