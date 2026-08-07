import { UnauthorizedError } from "./unauthorized.error";

class AuthMalformedTokenError extends UnauthorizedError {
  constructor(message: string) {
    super(message);
    this.name = "MalformedTokenError";
  }
}

export { AuthMalformedTokenError };
