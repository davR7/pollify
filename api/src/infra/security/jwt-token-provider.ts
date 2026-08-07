import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AuthMalformedTokenError } from "@/shared/errors/auth-malformed-token.error";
import { AuthTokenExpiredError } from "@/shared/errors/auth-token-expired.error";
import { AuthInvalidTokenError } from "@/shared/errors/auth-token-invalid.error";
import { TokenPayload, TokenProvider } from "@/use-cases/auth/ports/token-provider";

class JwtTokenProvider implements TokenProvider {
  constructor(
    private accessTokenSecret: string,
    private refreshTokenSecret: string,
  ) {}
  generateAccessToken(payload: TokenPayload, expiresIn: number): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn });
  }
  generateRefreshToken(payload: TokenPayload, expiresIn: number): string {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn });
  }
  verifyAccessToken(token: string): TokenPayload {
    try {
      const payload = jwt.verify(token, this.accessTokenSecret) as TokenPayload;
      if (typeof payload === "string") {
        throw new AuthMalformedTokenError("Access token is malformed.");
      }
      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AuthTokenExpiredError("Access token has expired");
      }
      throw new AuthInvalidTokenError("Access token is invalid");
    }
  }
  verifyRefreshToken(token: string): TokenPayload {
    try {
      const payload = jwt.verify(token, this.refreshTokenSecret) as TokenPayload;
      if (typeof payload === "string") {
        throw new AuthMalformedTokenError("Refresh token is malformed.");
      }
      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AuthTokenExpiredError("Refresh token has expired");
      }
      throw new AuthInvalidTokenError("Refresh token is invalid");
    }
  }
}

export { JwtTokenProvider };
