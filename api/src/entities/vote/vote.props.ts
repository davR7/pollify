export interface VoteProps {
  userId: string;
  pollId: string;
  optionId: string;
}

export interface PersistedVoteProps {
  id: string;
  userId: string;
  pollId: string;
  optionId: string;
  createdAt: Date;
}
