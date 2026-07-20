import { PersistedUserProps, UserProps } from "@/entities/user/user.props";

export interface UserRepository {
  create(input: UserProps): Promise<PersistedUserProps>;
  getUserByEmail(email: string): Promise<PersistedUserProps | null>;
}
