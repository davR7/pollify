import { PersistedOption, PersistedPollProps } from "@/entities/poll/poll.props";

type PersistedOptionWithVote = PersistedOption & {
  votes: number;
};

export type PollWithVotes = Omit<PersistedPollProps, "options" | "userId" | "createdAt"> & {
  options: PersistedOptionWithVote[];
  totalVotes: number;
};
