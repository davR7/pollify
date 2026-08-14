import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "@/shared/errors/http.error";

function CatchAllMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const mode = process.env.NODE_ENV !== "production";
  const serverMessage = mode ? err.message : "Internal server error";

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationFailed",
      message: err.issues[0].message,
      statusCode: 400,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  return res.status(500).json({
    error: "InternalServerError",
    message: serverMessage,
    statusCode: 500,
  });
}

export { CatchAllMiddleware };
