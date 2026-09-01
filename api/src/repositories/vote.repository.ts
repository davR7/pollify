import { Vote } from "@/entities/vote/vote.entity";

export interface VoteRepository {
  create(input: Vote): Promise<Vote>;
  findById(id: string): Promise<Vote | null>;
  findByPollAndUser(pollId: string, authorId: string): Promise<Vote | null>;
}
