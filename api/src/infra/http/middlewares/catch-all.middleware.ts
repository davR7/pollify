import { STATUS_CODES } from "node:http";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "@/shared/errors/http.error";

function CatchAllMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const mode = process.env.NODE_ENV !== "production";

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationFailed",
      message: err.issues[0].message,
      statusCode: 400,
    });
  }

  if (err instanceof HttpError) {
    const message = mode ? err.message : STATUS_CODES[err.code];

    return res.status(err.code).json({
      error: err.name,
      message: message,
      statusCode: err.code,
    });
  }

  return res.status(500).json({
    name: "InternalServerError",
    message: mode ? err.message : "Internal server error",
    statusCode: 500,
  });
}

export { CatchAllMiddleware };
