import { UserRole } from "@/entities/user/user-role";

export interface SignUpInputDto {
  fullname: string;
  email: string;
  password: string;
  role?: UserRole;
}
