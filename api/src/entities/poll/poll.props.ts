import { PollStatus } from "./poll-status";

export type PollProps = {
  title: string;
  options: PollOptionProps[];
  status?: PollStatus;
  startsAt?: Date | null;
  endsAt?: Date | null;
  authorId: string;
};

export type PersistedPollProps = Omit<PersistedPoll, "authorId"> & {
  options: PollOption[];
};

export type PersistedPoll = {
  id: string;
  title: string;
  status: PollStatus;
  startsAt: Date | null;
  endsAt: Date | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PollOptionProps = {
  text: string;
};

export type PollOption = PollOptionProps & {
  id: string;
  pollId: string;
  createdAt: Date;
};
