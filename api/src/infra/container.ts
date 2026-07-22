import { CreateUserUseCase } from "@/use-cases/user/create-user.use-case";
import { UserPrismaRepository } from "./repositories/user-prisma.repository";
import { BcryptHasher } from "./security/bcrypt.hasher";
import { LoginUserUseCase } from "@/use-cases/user/login-user.use-case";
import { JwtTokenProvider } from "./security/jwt-token-provider";

class Container {
  //infra
  private readonly userRepository = new UserPrismaRepository();
  private readonly bcryptHasher = new BcryptHasher();
  private readonly jwtTokenProvider = new JwtTokenProvider(
    process.env.SECRET,
    Number(process.env.JWT_EXPIRES_IN),
  );

  //use-case
  private readonly createUserUseCase = new CreateUserUseCase(
    this.userRepository,
    this.bcryptHasher,
  );
  private readonly loginUserUseCase = new LoginUserUseCase(
    this.userRepository,
    this.bcryptHasher,
    this.jwtTokenProvider,
  );

  //getter methods
  getCreateUserUseCase() {
    return this.createUserUseCase;
  }
  getLoginUserUseCase() {
    return this.loginUserUseCase;
  }
}

export const container = new Container();
export type ContainerType = typeof container;
