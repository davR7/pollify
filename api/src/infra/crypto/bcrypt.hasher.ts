import bcrypt from "bcrypt";
import { PasswordHasher } from "@/use-cases/user/ports/password-hasher";

class BcryptHasher implements PasswordHasher {
  constructor(private salt = 10) {}

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export { BcryptHasher };
