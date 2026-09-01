import { GetPollWithUserVoteOutputDto } from "@/dtos/get-poll-with-user-vote-output.dto";
import { VoteOutputDto } from "@/dtos/vote-output.dto";
import { Vote } from "@/entities/vote/vote.entity";
import { PersistedVoteProps } from "@/entities/vote/vote.props";
import { PollWithVotes } from "@/infra/repositories/ports/poll-with-votes";

export class VoteMapper {
  static toDomain(input: PersistedVoteProps): Vote {
    return Vote.restore({
      id: input.id,
      optionId: input.optionId,
      pollId: input.pollId,
      userId: input.userId,
      createdAt: input.createdAt,
    });
  }
  static toVoteOutput(input: Vote): VoteOutputDto {
    return {
      id: input.id,
      optionId: input.optionId,
      pollId: input.pollId,
      userId: input.userId,
      createdAt: input.createdAt,
    };
  }
  static toPollWithUserVoteDto(
    poll: PollWithVotes,
    vote: PersistedVoteProps | null,
  ): GetPollWithUserVoteOutputDto {
    return {
      id: poll.id,
      title: poll.title,
      status: poll.status,
      startsAt: poll.startsAt,
      endsAt: poll.endsAt,
      options: poll.options,
      totalVotes: poll.totalVotes,
      userVote: vote
        ? {
            optionId: vote.optionId,
          }
        : null,
    };
  }
}
