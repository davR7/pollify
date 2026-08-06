export interface TokenPayload {
  sub: string;
}

export interface TokenProvider {
  generateAccessToken(payload: { sub: string }, expiresIn: number): string;
  generateRefreshToken(payload: { sub: string }, expiresIn: number): string;
  verifyAccessToken(payload: string): TokenPayload;
  verifyRefreshToken(payload: string): TokenPayload;
}
