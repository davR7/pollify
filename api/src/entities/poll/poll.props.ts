import { PollStatus } from "./poll-status";

export type OptionProps = {
  text: string;
};

export type PersistedOption = {
  id: string;
  text: string;
  createdAt: Date;
};

export type PollProps = {
  title: string;
  options: OptionProps[];
  status?: PollStatus;
  startsAt: Date;
  endsAt: Date;
  userId: string;
};

export type PersistedPollProps = Omit<PollProps, "options"> & {
  id: string;
  title: string;
  status: PollStatus;
  options: PersistedOption[];
  startsAt: Date;
  endsAt: Date;
  userId: string;
  createdAt: Date;
};
