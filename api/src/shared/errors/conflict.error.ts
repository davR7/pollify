import { HttpError } from "./http.error";

class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictError";
  }
}

export { ConflictError };
