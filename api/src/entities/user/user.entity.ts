import { PersistedUserProps, UserProps } from "./user.props";
import { UserRole } from "./user-role";

class User {
  private constructor(private props: PersistedUserProps) {}

  static create(props: UserProps): User {
    return new User({
      ...props,
      id: crypto.randomUUID(),
      role: props.role ?? UserRole.USER,
      createdAt: new Date(),
    });
  }

  static restore(props: PersistedUserProps): User {
    return new User(props);
  }

  get id(): string {
    return this.props.id;
  }

  get fullname(): string {
    return this.props.fullname;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

export { User };
