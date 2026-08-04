import { GetCurrentUserInputDto } from "@/dtos/get-current-user-input.dto";
import { GetCurrentUserOutputDto } from "@/dtos/get-current-user-output.dto";
import { UserMapper } from "@/mappers/user.mapper";
import { UserRepository } from "@/repositories/user.repository";
import { NotFoundError } from "@/shared/errors/not-found.error";

class GetCurrentUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: GetCurrentUserInputDto): Promise<GetCurrentUserOutputDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return UserMapper.toCurrentUserOutput(user);
  }
}

export { GetCurrentUserUseCase };
