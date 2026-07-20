import { PersistedUserProps, UserProps } from "./user.props";

class User {
  private constructor(_props: PersistedUserProps | UserProps) {}

  static create(props: UserProps) {
    return new User(props);
  }

  static restore(props: PersistedUserProps) {
    return new User(props);
  }
}

export { User };
