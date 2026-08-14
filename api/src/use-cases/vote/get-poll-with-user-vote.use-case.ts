import { GetPollWithUserVoteInputDto2 } from "@/dtos/get-poll-with-user-vote-input2.dto";
import { GetPollWithUserVoteOutputDto } from "@/dtos/get-poll-with-user-vote-output.dto";
import { VoteMapper } from "@/mappers/vote.mapper";
import { PollRepository } from "@/repositories/poll.repository";
import { VoteRepository } from "@/repositories/vote.repository";
import { NotFoundError } from "@/shared/errors/not-found.error";

class GetPollWithUserVoteUseCase {
  constructor(
    private voteRepository: VoteRepository,
    private pollRepository: PollRepository,
  ) {}

  async execute({
    userId,
    pollId,
  }: GetPollWithUserVoteInputDto2): Promise<GetPollWithUserVoteOutputDto> {
    const poll = await this.pollRepository.findById(pollId);
    if (!poll) {
      throw new NotFoundError("poll not found");
    }
    const vote = await this.voteRepository.findByPollAndUser(pollId, userId);
    return VoteMapper.toPollWithUserVoteDto(poll, vote);
  }
}

export { GetPollWithUserVoteUseCase };
