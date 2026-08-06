import { RefreshTokenInputDto } from "@/dtos/refresh-token-input.dto";
import { RefreshTokenOutputDto } from "@/dtos/refresh-token-output.dto";
import { UserRepository } from "@/repositories/user.repository";
import { ACCESS_TOKEN_EXPIRES_IN } from "@/shared/constants/auth.constants";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";
import { TokenProvider } from "./ports/token-provider";

class RefreshTokenUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: TokenProvider,
  ) {}

  async execute({ refreshToken }: RefreshTokenInputDto): Promise<RefreshTokenOutputDto> {
    if (!refreshToken) {
      throw new UnauthorizedError("No refresh token provided");
    }
    const payload = await this.tokenProvider.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const accessToken = await this.tokenProvider.generateAccessToken(
      { sub: payload.sub },
      ACCESS_TOKEN_EXPIRES_IN,
    );
    return { accessToken };
  }
}

export { RefreshTokenUseCase };
