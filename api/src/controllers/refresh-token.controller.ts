import { RefreshTokenInputDto } from "@/dtos/refresh-token-input.dto";
import { RefreshTokenOutputDto } from "@/dtos/refresh-token-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { RefreshTokenUseCase } from "@/use-cases/auth/refresh-token.use-case";

class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handler(
    req: ExpressRequest<RefreshTokenInputDto>,
    res: ExpressResponse<RefreshTokenOutputDto>,
  ) {
    const { accessToken } = await this.refreshTokenUseCase.execute({
      refreshToken: req.cookies.jwt,
    });
    return res.json({ accessToken });
  }
}

export { RefreshTokenController };
