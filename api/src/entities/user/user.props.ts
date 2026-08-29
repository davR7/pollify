import { UserRole } from "./user-role";

export type UserProps = {
  fullname: string;
  email: string;
  password: string;
  role: UserRole;
};

export type PersistedUserProps = UserProps & {
  id: string;
  createdAt: Date;
};
