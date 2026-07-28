import { PersistedPoll, PersistedPollProps, PollProps } from "@/entities/poll/poll.props";
import { PollStatus } from "@/entities/poll/poll-status";

export type FindPollFilter = {
  id?: string;
  userId?: string;
  status?: PollStatus[];
};

export interface PollRepository {
  create(input: PollProps): Promise<PersistedPollProps>;
  findById(id: string): Promise<PersistedPollProps | null>;
  findAll(): Promise<PersistedPoll[]>;
  findMany(filter: FindPollFilter): Promise<PersistedPoll[]>;
  update(id: string, input: Partial<PollProps>): Promise<PersistedPoll>;
  deleteById(id: string): Promise<void>;
}
