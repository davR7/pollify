import { PersistedUserProps, UserProps } from "@/entities/user/user.props";
import { UserRepository } from "@/repositories/user.repository";
import { prisma } from "../database/prisma";

class UserPrismaRepository implements UserRepository {
  async create(input: UserProps): Promise<PersistedUserProps> {
    const newUser = await prisma.user.create({
      data: input,
    });
    return newUser;
  }

  async findByEmail(email: string): Promise<PersistedUserProps | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<PersistedUserProps | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
}

export { UserPrismaRepository };
