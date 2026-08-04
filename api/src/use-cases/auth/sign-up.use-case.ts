import { SignUpInputDto } from "@/dtos/sign-up-input.dto";
import { SignUpOutputDto } from "@/dtos/sign-up-output.dto";
import { UserRole } from "@/entities/user/user-role";
import { UserMapper } from "@/mappers/user.mapper";
import { UserRepository } from "@/repositories/user.repository";
import { ConflictError } from "@/shared/errors/conflict.error";
import { PasswordHasher } from "./ports/password-hasher";

class SignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
  ) {}

  async execute({ fullname, email, password }: SignUpInputDto): Promise<SignUpOutputDto> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new ConflictError("User Already exists");
    }
    const hash = await this.passwordHasher.hash(password);
    const newUser = await this.userRepository.create({
      fullname,
      email,
      password: hash,
      role: UserRole.USER,
    });
    return UserMapper.toSignUpOutput(newUser);
  }
}

export { SignUpUseCase };
