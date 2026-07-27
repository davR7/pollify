import { ListPollOutputDto } from "@/dtos/list-poll-output.dto";
import { PollRepository } from "@/repositories/poll.repository";

class ListAvailablePollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(): Promise<ListPollOutputDto[]> {
    const polls = await this.pollRepository.findMany();
    return polls;
  }
}

export { ListAvailablePollUseCase };
