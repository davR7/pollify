import { UserRole } from "@/entities/user/user-role";

export interface CreateUserInputDto {
  fullname: string;
  email: string;
  password: string;
  role?: UserRole;
}
