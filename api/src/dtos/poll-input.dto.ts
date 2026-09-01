import { PollOption } from "@/entities/poll/poll-option";
import { PollStatus } from "@/entities/poll/poll-status";

export interface PollInputDto {
  title: string;
  options: PollOption[];
  status?: PollStatus;
  startsAt: Date;
  endsAt: Date;
  userId: string;
}
