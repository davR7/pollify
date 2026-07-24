import { PersistedPoll, PersistedPollProps, PollProps } from "@/entities/poll/poll.props";

export interface PollRepository {
  create(input: PollProps): Promise<PersistedPollProps>;
  findById(id: string): Promise<PersistedPollProps | null>;
  list(): Promise<PersistedPoll[]>;
}
