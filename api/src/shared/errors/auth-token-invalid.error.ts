import { UnauthorizedError } from "./unauthorized.error";

class AuthInvalidTokenError extends UnauthorizedError {
  constructor(message: string) {
    super(message);
    this.name = "InvalidTokenError";
  }
}

export { AuthInvalidTokenError };
