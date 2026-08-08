import { ForbiddenError } from "./forbidden.error";

class AuthTokenExpiredError extends ForbiddenError {
  constructor(message: string) {
    super(message);
    this.name = "TokenExpiredError";
  }
}

export { AuthTokenExpiredError };
