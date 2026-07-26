import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

type Target = "body" | "params" | "query";

export function zodValidatorMiddleware(target: Target, schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req[target]);
      next();
    } catch (err: unknown) {
      next(err);
    }
  };
}
