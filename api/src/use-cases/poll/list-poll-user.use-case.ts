import { ListPollOutputDto } from "@/dtos/list-poll-output.dto";
import { ListPollUserInputDto } from "@/dtos/list-poll-user-input.dto";
import { PollRepository } from "@/repositories/poll.repository";

class ListPollUserUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(input: ListPollUserInputDto): Promise<ListPollOutputDto> {
    const polls = await this.pollRepository.findMany({
      userId: input.userId,
    });
    return { polls };
  }
}

export { ListPollUserUseCase };
