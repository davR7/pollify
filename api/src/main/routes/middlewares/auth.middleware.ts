import { NextFunction, Request, Response } from "express";
import { AuthMalformedTokenError } from "@/shared/errors/auth-malformed-token.error";
import { AuthMissingTokenError } from "@/shared/errors/auth-missing-token.error";
import { AuthInvalidTokenError } from "@/shared/errors/auth-token-invalid.error";
import { TokenProvider } from "@/use-cases/auth/ports/token-provider";

export default function authMiddleware(tokenProvider: TokenProvider) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authheader = req.headers.authorization;

    if (!authheader) {
      throw new AuthMissingTokenError("Access token is missing");
    }

    const parts = authheader.split(" ");
    if (!(parts.length === 2)) {
      throw new AuthInvalidTokenError("Access token is invalid");
    }

    const [schema, accessToken] = parts;
    if (!/^Bearer$/i.test(schema)) {
      throw new AuthMalformedTokenError("Access token is malformed");
    }

    const user = tokenProvider.verifyAccessToken(accessToken);
    res.locals.userId = user.sub;
    return next();
  };
}
