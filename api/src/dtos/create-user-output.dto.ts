import { UserRole } from "@/entities/user/user-role";

export interface CreateUserOutputDto {
  id: string;
  fullname: string;
  email: string;
  role?: UserRole;
  createdAt: Date;
}
