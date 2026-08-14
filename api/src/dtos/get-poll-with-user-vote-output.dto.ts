import { PollOutputDto } from "./poll-output.dto";

export interface GetPollWithUserVoteOutputDto extends PollOutputDto {
  totalVotes: number;
  userVote: {
    optionId: string;
  } | null;
}
