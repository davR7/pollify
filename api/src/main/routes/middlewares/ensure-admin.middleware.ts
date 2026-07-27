import { NextFunction, Request, Response } from "express";
import { UserRole } from "@/entities/user/user-role";
import { UserPrismaRepository } from "@/infra/repositories/user-prisma.repository";
import { ForbiddenError } from "@/shared/errors/forbidden.error";
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";

export default function ensureAdmin(roles: UserRole[]) {
  return async (_req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserPrismaRepository();
    const user = await userRepository.findById(res.locals.userId);
    if (!user) {
      return next(new UnauthorizedError("No token provided"));
    }
    if (!roles.includes(user.role)) {
      return next(new ForbiddenError("Access denied"));
    }
    next();
  };
}
