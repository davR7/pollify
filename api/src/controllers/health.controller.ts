import type { Request, Response } from "express";
import packageJson from "../../package.json";
const version = packageJson.version;

export class HealthController {
  async handler(_req: Request, res: Response) {
    return res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version,
    });
  }
}