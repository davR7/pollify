import { GetPollWithUserVoteOutputDto } from "@/dtos/get-poll-with-user-vote-output";
import { PersistedPollProps } from "@/entities/poll/poll.props";
import { PersistedVoteProps } from "@/entities/vote/vote.props";

export class VoteMapper {
  static toPollWithUserVoteDto(
    poll: PersistedPollProps,
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
      createdAt: poll.createdAt,
    };
  }
}
