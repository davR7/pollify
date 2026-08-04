export interface TokenPayload {
  sub?: string;
}

export interface TokenProvider {
  generateToken(payload: { sub: string }): string;
  verifyToken(payload: string): TokenPayload | string;
}
