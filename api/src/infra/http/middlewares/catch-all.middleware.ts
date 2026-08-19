import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "@/shared/errors/http.error";

function CatchAllMiddleware(error: Error, req: Request, res: Response, _next: NextFunction) {
  const mode = process.env.NODE_ENV !== "production";
  const serverMessage = mode ? error.message : "Internal server error";

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationFailed",
      message: error.issues[0].message,
      statusCode: 400,
    });
  }

  if (error instanceof HttpError) {
    req.log.warn(
      {
        statusCode: error.statusCode,
      },
      error.message,
    );

    return res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  req.log.error({ err: error }, "Unhandled error");

  return res.status(500).json({
    error: "InternalServerError",
    message: serverMessage,
    statusCode: 500,
  });
}

export { CatchAllMiddleware };
