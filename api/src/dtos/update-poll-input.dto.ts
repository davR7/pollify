import { PollStatus } from "@/entities/poll/poll-status";

export interface UpdatePollInputDto {
  status?: PollStatus;
  startsAt?: Date;
  endsAt?: Date;
}
