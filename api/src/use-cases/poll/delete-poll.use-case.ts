import { DeleteVoteInputDto } from "@/dtos/delete-poll-input.dto";
import { PollRepository } from "@/repositories/poll.repository";
import { NotFoundError } from "@/shared/errors/not-found.error";

class DeletePollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(input: DeleteVoteInputDto): Promise<void> {
    const poll = await this.pollRepository.findById(input.id);
    if (!poll) {
      throw new NotFoundError("Poll not found");
    }
    return await this.pollRepository.deleteById(input.id);
  }
}

export { DeletePollUseCase };
