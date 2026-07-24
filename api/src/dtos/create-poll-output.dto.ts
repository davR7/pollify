import { PollOption } from "@/entities/poll/poll.props";
import { PollStatus } from "@/entities/poll/poll-status";

export interface CreatePollOutputDto {
  id: string;
  title: string;
  options: PollOption[];
  status: PollStatus;
  startsAt: Date | null;
  endsAt: Date | null;
  createdAt: Date;
}
