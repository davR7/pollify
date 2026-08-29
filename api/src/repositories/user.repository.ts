import { User } from "@/entities/user/user.entity";

export interface UserRepository {
  create(input: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
