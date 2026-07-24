import { PersistedVoteProps, VoteProps } from "@/entities/vote/vote.props";

export interface VoteRepository {
  create(input: VoteProps): Promise<PersistedVoteProps>;
  findById(id: string): Promise<PersistedVoteProps | null>;
  findByPollAndUser(pollId: string, authorId: string): Promise<PersistedVoteProps | null>;
}
