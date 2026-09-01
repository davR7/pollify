import { PollStatus } from "@/entities/poll/poll-status";

export type PollWithAuthor = {
  id: string;
  title: string;
  status: PollStatus;
  startsAt: Date;
  endsAt: Date;
  user?: {
    id: string;
    fullname: string;
  };
};
