import { PersistedOption } from "@/entities/poll/poll.props";
import { PollStatus } from "@/entities/poll/poll-status";

export interface PollOutputDto {
  id: string;
  title: string;
  options: PersistedOption[];
  status: PollStatus;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
}
