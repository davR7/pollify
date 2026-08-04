import { SignInInputDto } from "@/dtos/sign-in-input.dto";
import { SignInOutputDto } from "@/dtos/sign-in-output.dto";
import { UserRepository } from "@/repositories/user.repository";
import { BadRequestError } from "@/shared/errors/bad-request.error";
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
      throw new BadRequestError("Invalid email or password");
    }
    const passwordHash = await this.passwordHasher.compare(password, user.password);
    if (!passwordHash) {
      throw new BadRequestError("Invalid email or password");
    }
    const token = this.tokenProvider.generateToken({ sub: user.id });
    return { token };
  }
}

export { SignInUseCase };
