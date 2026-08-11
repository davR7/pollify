import { PollOutputDto } from "@/dtos/poll-output.dto";
import { PersistedPollProps } from "@/entities/poll/poll.props";

export class PollMapper {
  static toCreatePollOutput(input: PersistedPollProps): PollOutputDto {
    return {
      id: input.id,
      title: input.title,
      options: input.options,
      status: input.status,
      startsAt: input.startsAt,
      endsAt: input.endsAt,
      createdAt: input.createdAt,
    };
  }
}
