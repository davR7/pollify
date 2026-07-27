import { HttpError } from "./http.error";

class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export { ForbiddenError };
