import { Poll } from "@/entities/poll/poll.entity";
import { PollStatus } from "@/entities/poll/poll-status";
import { PollWithAuthor } from "@/infra/repositories/ports/poll-with-author";
import { PollWithVotes } from "@/infra/repositories/ports/poll-with-votes";

export type FindManyOptions = {
  filter?: {
    id?: string;
    userId?: string;
    status?: PollStatus[];
  };
  includeUser?: boolean;
};

export interface PollRepository {
  create(input: Poll): Promise<Poll>;
  findById(id: string): Promise<PollWithVotes | null>;
  findExpiredByStatus(status: PollStatus): Promise<void>;
  findMany(options: FindManyOptions): Promise<PollWithAuthor[]>;
  update(id: string, input: Partial<Poll>): Promise<Poll>;
  deleteById(id: string): Promise<void>;
}
