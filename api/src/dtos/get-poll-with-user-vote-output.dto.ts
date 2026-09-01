import { PollOutputDto } from "./poll-output.dto";

export interface GetPollWithUserVoteOutputDto extends Omit<PollOutputDto, "createdAt"> {
  totalVotes: number;
  userVote: {
    optionId: string;
  } | null;
}
