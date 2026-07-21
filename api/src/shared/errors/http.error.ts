class HttpError extends Error {
  constructor(
    message: string,
    public readonly code: number,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export { HttpError };
