import { CreateUserInputDto } from "@/dtos/create-user-input.dto";
import { CreateUserOutputDto } from "@/dtos/create-user-output.dto";
import { UserMapper } from "@/mappers/user.mapper";
import { UserRepository } from "@/repositories/user.repository";
import { ConflictError } from "@/shared/errors/conflict.error";
import { PasswordHasher } from "./ports/password-hasher";

class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
  ) {}

  async execute({ fullname, email, password }: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new ConflictError("User Already exists");
    }
    const hash = await this.passwordHasher.hash(password);
    const newUser = await this.userRepository.create({ fullname, email, password: hash });
    return UserMapper.toOutput(newUser);
  }
}

export { CreateUserUseCase };
