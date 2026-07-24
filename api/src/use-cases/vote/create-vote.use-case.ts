import { CreateVoteInput2Dto } from "@/dtos/create-vote-input2.dto";
import { CreateVoteOutputDto } from "@/dtos/create-vote-output.dto";
import { PollRepository } from "@/repositories/poll.repository";
import { VoteRepository } from "@/repositories/vote.repository";
import { ConflictError } from "@/shared/errors/conflict.error";
import { NotFoundError } from "@/shared/errors/not-found.error";

class CreateVoteUseCase {
  constructor(
    private voteRepository: VoteRepository,
    private pollRepository: PollRepository,
  ) {}

  async execute({ authorId, pollId, optionId }: CreateVoteInput2Dto): Promise<CreateVoteOutputDto> {
    const poll = await this.pollRepository.getPollById(pollId);
    if (!poll) {
      throw new NotFoundError("poll not found");
    }
    const vote = await this.voteRepository.findByPollAndUser(pollId, authorId);
    if (vote) {
      throw new ConflictError("User has already voted.");
    }
    const newVote = await this.voteRepository.create({ authorId, optionId, pollId });
    return newVote;
  }
}

export { CreateVoteUseCase };
