import { CreateUserOutputDto } from "@/dtos/create-user-output.dto";
import { PersistedUserProps } from "@/entities/user/user.props";

export class UserMapper {
  static toOutput(input: PersistedUserProps): CreateUserOutputDto {
    return {
      id: input.id,
      fullname: input.fullname,
      email: input.email,
      createdAt: input.createdAt,
    };
  }
}
