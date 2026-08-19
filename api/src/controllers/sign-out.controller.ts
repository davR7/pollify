import { Request, Response } from "express";

class SignOutController {
  async handler(req: Request, res: Response) {
    const refressToken = req.cookies.jwt;

    if (!refressToken) {
      return res.sendStatus(204);
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    req.log.info(
      {
        userId: res.locals.userId,
      },
      "User signed out",
    );

    return res.json({ message: "Logout successful" });
  }
}

export { SignOutController };
