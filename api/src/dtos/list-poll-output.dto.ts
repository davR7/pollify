import { PollStatus } from "@/entities/poll/poll-status";

export interface ListPollOutputDto {
  id: string;
  title: string;
  status: PollStatus;
  startsAt: Date | null;
  endsAt: Date | null;
  authorId: string;
  createdAt: Date;
}
