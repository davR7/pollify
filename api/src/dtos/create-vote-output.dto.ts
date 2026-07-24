export interface CreateVoteOutputDto {
  id: string;
  authorId: string;
  pollId: string;
  optionId: string;
  createdAt: Date;
}
