import jwt from "jsonwebtoken";
import { TokenPayload, TokenProvider } from "@/use-cases/user/ports/token-provider";

class JwtTokenProvider implements TokenProvider {
  constructor(
    private secretKey: string,
    private expiresIn: number,
  ) {}

  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): TokenPayload | string {
    return jwt.verify(token, this.secretKey);
  }
}

export { JwtTokenProvider };
