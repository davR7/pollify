import { PollStatus } from "@/entities/poll/poll-status";

export interface UpdatePollOutputDto {
  id: string;
  title: string;
  status: PollStatus;
  startsAt: Date;
  endsAt: Date;
}
