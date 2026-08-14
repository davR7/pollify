import { PersistedPoll, PersistedPollProps, PollProps } from "@/entities/poll/poll.props";
import { PollStatus } from "@/entities/poll/poll-status";

export type FindManyOptions = {
  filter: {
    id?: string;
    userId?: string;
    status?: PollStatus[];
  };
  includeUser?: boolean;
};

export interface PollRepository {
  create(input: PollProps): Promise<PersistedPoll>;
  findById(id: string): Promise<PersistedPollProps | null>;
  findMany(options?: FindManyOptions): Promise<PersistedPoll[]>;
  update(id: string, input: Partial<PollProps>): Promise<PersistedPoll>;
  deleteById(id: string): Promise<void>;
}
