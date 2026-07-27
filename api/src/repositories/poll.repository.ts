import { PersistedPoll, PersistedPollProps, PollProps } from "@/entities/poll/poll.props";

export interface PollRepository {
  create(input: PollProps): Promise<PersistedPollProps>;
  findById(id: string): Promise<PersistedPollProps | null>;
  findAll(): Promise<PersistedPoll[]>;
  findMany(): Promise<PersistedPoll[]>;
  update(id: string, input: Partial<PollProps>): Promise<PersistedPoll>;
  deleteById(id: string): Promise<void>;
}
