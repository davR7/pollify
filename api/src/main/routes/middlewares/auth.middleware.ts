import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";
import { TokenProvider } from "@/use-cases/auth/ports/token-provider";

export default function authMiddleware(tokenProvider: TokenProvider) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authheader = req.headers.authorization;

    if (!authheader) {
      throw new UnauthorizedError("No access token provided");
    }

    const parts = authheader.split(" ");
    if (!(parts.length === 2)) {
      throw new UnauthorizedError("Access token Error");
    }

    const [schema, accessToken] = parts;
    if (!/^Bearer$/i.test(schema)) {
      throw new UnauthorizedError("Access token malformatted");
    }

    const user = tokenProvider.verifyAccessToken(accessToken);
    res.locals.userId = user.sub;
    return next();
  };
}
