import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@/shared/errors/not-found.error";

function NotFoundMiddleware(req: Request, _res: Response, next: NextFunction) {
  const error = new NotFoundError(`Route '${req.method} ${req.originalUrl}' not found`);
  next(error);
}

export { NotFoundMiddleware };
