import { UnauthorizedError } from "./unauthorized.error";

class AuthMissingTokenError extends UnauthorizedError {
  constructor(message: string) {
    super(message);
    this.name = "AuthMissingTokenError";
  }
}

export { AuthMissingTokenError };
