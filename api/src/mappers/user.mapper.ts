import { GetCurrentUserOutputDto } from "@/dtos/get-current-user-output.dto";
import { SignUpOutputDto } from "@/dtos/sign-up-output.dto";
import { User } from "@/entities/user/user.entity";
import { PersistedUserProps } from "@/entities/user/user.props";

export class UserMapper {
  static toDomain(input: PersistedUserProps): User {
    return User.restore({
      id: input.id,
      fullname: input.fullname,
      email: input.email,
      password: input.password,
      role: input.role,
      createdAt: input.createdAt,
    });
  }
  static toSignUpOutput(input: PersistedUserProps): SignUpOutputDto {
    return {
      id: input.id,
      fullname: input.fullname,
      email: input.email,
      createdAt: input.createdAt,
    };
  }
  static toCurrentUserOutput(input: PersistedUserProps): GetCurrentUserOutputDto {
    return {
      id: input.id,
      fullname: input.fullname,
      email: input.email,
      role: input.role,
    };
  }
}
