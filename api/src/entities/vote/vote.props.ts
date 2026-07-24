export interface VoteProps {
  authorId: string;
  pollId: string;
  optionId: string;
}

export interface PersistedVoteProps {
  id: string;
  authorId: string;
  pollId: string;
  optionId: string;
  createdAt: Date;
}
