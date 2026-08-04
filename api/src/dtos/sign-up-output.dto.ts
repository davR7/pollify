import { UserRole } from "@/entities/user/user-role";

export interface SignUpOutputDto {
  id: string;
  fullname: string;
  email: string;
  role?: UserRole;
  createdAt: Date;
}
