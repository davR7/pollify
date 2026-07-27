import { PersistedUserProps, UserProps } from "@/entities/user/user.props";

export interface UserRepository {
  create(input: UserProps): Promise<PersistedUserProps>;
  findByEmail(email: string): Promise<PersistedUserProps | null>;
  findById(id: string): Promise<PersistedUserProps | null>;
}
