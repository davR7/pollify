import { User } from "@/entities/user/user.entity";
import { UserMapper } from "@/mappers/user.mapper";
import { UserRepository } from "@/repositories/user.repository";
import { prisma } from "../database/prisma";

class UserPrismaRepository implements UserRepository {
  async create(input: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        id: input.id,
        fullname: input.fullname,
        email: input.email,
        password: input.password,
        role: input.role,
        createdAt: input.createdAt,
      },
    });
    return UserMapper.toDomain(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return UserMapper.toDomain(user);
  }
}

export { UserPrismaRepository };
