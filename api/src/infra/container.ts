import { CreateUserUseCase } from "@/use-cases/user/create-user.use-case";
import { BcryptHasher } from "./crypto/bcrypt.hasher";
import { UserPrismaRepository } from "./repositories/user-prisma.repository";

class Container {
  //infra
  private readonly userRepository = new UserPrismaRepository();
  private readonly bcryptHasher = new BcryptHasher();

  //use-case
  private readonly createUserUseCase = new CreateUserUseCase(
    this.userRepository,
    this.bcryptHasher,
  );

  //getter methods
  getCreateUserUseCase() {
    return this.createUserUseCase;
  }
}

export const container = new Container();
export type ContainerType = typeof container;
