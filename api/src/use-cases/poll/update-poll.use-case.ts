import { UpdatePollInputDto } from "@/dtos/update-poll-input.dto";
import { UpdatePollOutputDto } from "@/dtos/update-poll-output.dto";
import { UpdatePollParamsDto } from "@/dtos/update-poll-params.dto";
import { PollMapper } from "@/mappers/poll.mapper";
import { PollRepository } from "@/repositories/poll.repository";
import { NotFoundError } from "@/shared/errors/not-found.error";

class UpdatePollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(
    id: UpdatePollParamsDto["id"],
    input: UpdatePollInputDto,
  ): Promise<UpdatePollOutputDto> {
    const poll = await this.pollRepository.findById(id);
    if (!poll) {
      throw new NotFoundError("Poll not found");
    }
    const updatePoll = await this.pollRepository.update(id, input);
    return PollMapper.toUpdatePollOutput(updatePoll);
  }
}

export { UpdatePollUseCase };
