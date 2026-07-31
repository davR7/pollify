import { CreatePollInputDto } from "@/dtos/create-poll-input.dto";
import { CreatePollOutputDto } from "@/dtos/create-poll-output.dto";
import { PollStatus } from "@/entities/poll/poll-status";
import { PollMapper } from "@/mappers/poll.mapper";
import { PollRepository } from "@/repositories/poll.repository";

class CreatePollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(input: CreatePollInputDto): Promise<CreatePollOutputDto> {
    const newPoll = await this.pollRepository.create({
      ...input,
      status: PollStatus.DRAFT,
    });
    return PollMapper.toCreatePollOutput(newPoll);
  }
}

export { CreatePollUseCase };
