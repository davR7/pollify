import { UserRole } from "@/entities/user/user-role";

export interface GetCurrentUserOutputDto {
  id: string;
  fullname: string;
  email: string;
  role: UserRole;
}
