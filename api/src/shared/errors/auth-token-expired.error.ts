import { UnauthorizedError } from "./unauthorized.error";

class AuthTokenExpiredError extends UnauthorizedError {
  constructor(message: string) {
    super(message);
    this.name = "TokenExpiredError";
  }
}

export { AuthTokenExpiredError };
