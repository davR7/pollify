import { PollInputDto } from "@/dtos/poll-input.dto";
import { PollOutputDto } from "@/dtos/poll-output.dto";
import { Poll } from "@/entities/poll/poll.entity";
import { PollStatus } from "@/entities/poll/poll-status";
import { PollMapper } from "@/mappers/poll.mapper";
import { PollRepository } from "@/repositories/poll.repository";

class CreatePollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(input: PollInputDto): Promise<PollOutputDto> {
    const newPoll = await this.pollRepository.create(
      Poll.create({
        ...input,
        status: PollStatus.DRAFT,
      }),
    );
    return PollMapper.toCreatePollOutput(newPoll);
  }
}

export { CreatePollUseCase };
