import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";
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
        throw new UnauthorizedError("Invalid access token payload format");
      }
      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError("access token expired");
      }
      throw new UnauthorizedError("access token invalid");
    }
  }
  verifyRefreshToken(token: string): TokenPayload {
    try {
      const payload = jwt.verify(token, this.refreshTokenSecret) as TokenPayload;
      if (typeof payload === "string") {
        throw new UnauthorizedError("Invalid refresh token payload format");
      }
      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError("refresh token expired");
      }
      throw new UnauthorizedError("refresh token invalid");
    }
  }
}

export { JwtTokenProvider };
