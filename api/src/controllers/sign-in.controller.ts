import { SignInInputDto } from "@/dtos/sign-in-input.dto";
import { SignInOutputDto } from "@/dtos/sign-in-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { REFRESH_COOKIE_MAX_AGE, REFRESH_COOKIE_NAME } from "@/shared/constants/auth.constants";
import { SignInUseCase } from "@/use-cases/auth/sign-in.use-case";

class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async handler(req: ExpressRequest<SignInInputDto>, res: ExpressResponse<SignInOutputDto>) {
    const { accessToken, refreshToken } = await this.signInUseCase.execute(req.body);

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });

    req.log.info(
      {
        userId: res.locals.id,
      },
      "User signed in",
    );

    return res.json({ accessToken });
  }
}

export { SignInController };
