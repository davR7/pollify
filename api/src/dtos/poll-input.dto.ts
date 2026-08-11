import { PollOptionProps } from "@/entities/poll/poll.props";
import { PollStatus } from "@/entities/poll/poll-status";

export interface PollInputDto {
  title: string;
  options: PollOptionProps[];
  status?: PollStatus;
  startsAt?: Date;
  endsAt?: Date;
  userId: string;
}
