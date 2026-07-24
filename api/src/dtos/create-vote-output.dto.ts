export interface CreateVoteOutputDto {
  id: string;
  userId: string;
  pollId: string;
  optionId: string;
  createdAt: Date;
}
