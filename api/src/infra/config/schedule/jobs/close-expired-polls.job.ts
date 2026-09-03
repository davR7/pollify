import cron from "node-cron";
import { PollPrismaRepository } from "@/infra/repositories/poll-prisma.repository";
import { CLOSE_EXPIRED_POLLS_CRON } from "@/shared/constants/poll.constants";
import { ClosedExpiredPollUseCase } from "@/use-cases/poll/closed-expired-poll.use-case";
import { logger } from "../../logging";

export const closeExpiredPollsJob = () => {
  const pollRepository = new PollPrismaRepository();
  const closedExpiredPollUseCase = new ClosedExpiredPollUseCase(pollRepository);

  const task = cron.schedule(CLOSE_EXPIRED_POLLS_CRON, async () => {
    logger.info("[Polls Scheduler] Starting one-time verification of expired polls...");

    try {
      await closedExpiredPollUseCase.execute();
      logger.info("[Polls Scheduler] Expired poll closure process completed successfully.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(
          { err: error.message },
          "[Polls Scheduler] Failed to process expired poll closure: ",
        );
      }
    } finally {
      task.stop();
      logger.info(
        "[Polls Scheduler] Scheduler disabled. No further automatic poll verification will be performed.",
      );
    }
  });
};
