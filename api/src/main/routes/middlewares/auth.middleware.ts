import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";

export default (req: Request, res: Response, next: NextFunction) => {
  const authheader = req.headers.authorization;
  const secret = process.env.SECRET;

  if (!authheader) {
    throw new UnauthorizedError("No token provided");
  }

  const parts = authheader.split(" ");
  if (!(parts.length === 2)) {
    throw new UnauthorizedError("Token Error");
  }

  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema)) {
    throw new UnauthorizedError("Token malformatted");
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError("Token expired");
    }

    if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedError("Token invalid");
    }

    res.locals.userId = decoded?.sub;
    return next();
  });
};
