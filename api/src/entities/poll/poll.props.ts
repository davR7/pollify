import { PollStatus } from "./poll-status";

export type PollProps = {
  title: string;
  options: PollOptionProps[];
  status?: PollStatus;
  startsAt?: Date | null;
  endsAt?: Date | null;
  userId: string;
};

export type PersistedPollProps = Omit<PersistedPoll, "userId"> & {
  options: PollOption[];
  totalVotes: number;
};

export type PersistedPoll = {
  id: string;
  title: string;
  status: PollStatus;
  startsAt: Date | null;
  endsAt: Date | null;
  userId: string;
  createdAt: Date;
};

export type PollOptionProps = {
  text: string;
};

export type PollOption = PollOptionProps & {
  id: string;
  votes: number;
  createdAt: Date;
};
