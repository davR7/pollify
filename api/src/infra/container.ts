import { CreateUserUseCase } from "@/use-cases/user/create-user.use-case";
import { UserPrismaRepository } from "./repositories/user-prisma.repository";
import { BcryptHasher } from "./security/bcrypt.hasher";
import { LoginUserUseCase } from "@/use-cases/user/login-user.use-case";
import { JwtTokenProvider } from "./security/jwt-token-provider";
import { PollPrismaRepository } from "./repositories/poll-prisma.repository";
import { CreatePollUseCase } from "@/use-cases/poll/create-poll.use-case";
import { ListPollUseCase } from "@/use-cases/poll/list-poll.use-case";

class Container {
  //repository
  private readonly userRepository = new UserPrismaRepository();
  private readonly pollRepository = new PollPrismaRepository();

  //services
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
  private readonly createPollUseCase = new CreatePollUseCase(this.pollRepository);
  private readonly listPollUseCase = new ListPollUseCase(this.pollRepository);

  //getter methods
  getCreateUserUseCase() {
    return this.createUserUseCase;
  }
  getLoginUserUseCase() {
    return this.loginUserUseCase;
  }
  getCreatePollUseCase() {
    return this.createPollUseCase;
  }
  getListPollUseCase() {
    return this.listPollUseCase;
  }
}

export const container = new Container();
export type ContainerType = typeof container;
