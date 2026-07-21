import { STATUS_CODES } from "node:http";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "@/shared/errors/http.error";

function CatchAllMiddleware(err: HttpError, _req: Request, res: Response, _next: NextFunction) {
  const mode = process.env.NODE_ENV !== "production";
  const message = mode ? err.message : STATUS_CODES[err.code];

  return res.status(err.code).json({
    error: err.name,
    message: message,
    statusCode: err.code,
  });
}

export { CatchAllMiddleware };
