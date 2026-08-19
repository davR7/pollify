import { HealthController } from "@/controllers/health.controller";
import { Router } from "express";

const healthController = new HealthController();

export default (router: Router) => {
  router.get("/health", (req, res) =>
    healthController.handler(req, res),
  );
}