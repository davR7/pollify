import { PollStatus } from "@/entities/poll/poll-status";
import { PollRepository } from "@/repositories/poll.repository";

class ClosedExpiredPollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute() {
    await this.pollRepository.findExpiredByStatus(PollStatus.OPEN);
  }
}

export { ClosedExpiredPollUseCase };
