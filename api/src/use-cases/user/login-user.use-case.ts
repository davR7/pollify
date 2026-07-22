import { LoginUserInputDto } from "@/dtos/login-user-input.dto";
import { LoginUserOutputDto } from "@/dtos/login-user-output.dto";
import { UserRepository } from "@/repositories/user.repository";
import { BadRequestError } from "@/shared/errors/bad-request.error";
import { PasswordHasher } from "./ports/password-hasher";
import { TokenProvider } from "./ports/token-provider";

class LoginUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
    private tokenProvider: TokenProvider,
  ) {}

  async execute({ email, password }: LoginUserInputDto): Promise<LoginUserOutputDto> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new BadRequestError("Invalid email or password. (email)");
    }
    const passwordHash = await this.passwordHasher.compare(password, user.password);
    if (!passwordHash) {
      throw new BadRequestError("Invalid email or password. (password)");
    }
    const token = this.tokenProvider.generateToken({ sub: user.id });
    return { token };
  }
}

export { LoginUserUseCase };
