import { ListPollOutputDto } from "@/dtos/list-poll-output.dto";
import { PollRepository } from "@/repositories/poll.repository";

class ListPollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(): Promise<ListPollOutputDto[]> {
    const polls = await this.pollRepository.findAll();
    return polls;
  }
}

export { ListPollUseCase };
