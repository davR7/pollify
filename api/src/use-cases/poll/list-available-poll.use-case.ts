import { ListPollOutputDto } from "@/dtos/list-poll-output.dto";
import { PollStatus } from "@/entities/poll/poll-status";
import { PollRepository } from "@/repositories/poll.repository";

class ListAvailablePollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(): Promise<ListPollOutputDto[]> {
    const polls = await this.pollRepository.findMany({
      status: [PollStatus.OPEN, PollStatus.CLOSED],
    });
    return polls;
  }
}

export { ListAvailablePollUseCase };
