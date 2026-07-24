import { HttpError } from "./http.error";

class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export { UnauthorizedError };
