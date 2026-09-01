import { VoteInput2Dto } from "@/dtos/vote-input2.dto";
import { VoteOutputDto } from "@/dtos/vote-output.dto";
import { Vote } from "@/entities/vote/vote.entity";
import { VoteMapper } from "@/mappers/vote.mapper";
import { PollRepository } from "@/repositories/poll.repository";
import { VoteRepository } from "@/repositories/vote.repository";
import { ConflictError } from "@/shared/errors/conflict.error";
import { NotFoundError } from "@/shared/errors/not-found.error";

class CreateVoteUseCase {
  constructor(
    private voteRepository: VoteRepository,
    private pollRepository: PollRepository,
  ) {}

  async execute({ userId, pollId, optionId }: VoteInput2Dto): Promise<VoteOutputDto> {
    const poll = await this.pollRepository.findById(pollId);
    if (!poll) {
      throw new NotFoundError("poll not found");
    }
    const vote = await this.voteRepository.findByPollAndUser(pollId, userId);
    if (vote) {
      throw new ConflictError("User has already voted.");
    }
    const newVote = await this.voteRepository.create(Vote.create({ userId, pollId, optionId }));
    return VoteMapper.toVoteOutput(newVote);
  }
}

export { CreateVoteUseCase };
