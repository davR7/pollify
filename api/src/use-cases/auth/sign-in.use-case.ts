import { SignInInputDto } from "@/dtos/sign-in-input.dto";
import { SignInOutputDto } from "@/dtos/sign-in-output.dto";
import { UserRepository } from "@/repositories/user.repository";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "@/shared/constants/auth.constants";
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";
import { PasswordHasher } from "./ports/password-hasher";
import { TokenProvider } from "./ports/token-provider";

class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
    private tokenProvider: TokenProvider,
  ) {}

  async execute({ email, password }: SignInInputDto): Promise<SignInOutputDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const passwordHash = await this.passwordHasher.compare(password, user.password);
    if (!passwordHash) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const accessToken = await this.tokenProvider.generateAccessToken(
      { sub: user.id },
      ACCESS_TOKEN_EXPIRES_IN,
    );
    const refreshToken = await this.tokenProvider.generateRefreshToken(
      { sub: user.id },
      REFRESH_TOKEN_EXPIRES_IN,
    );
    return { accessToken, refreshToken };
  }
}

export { SignInUseCase };
