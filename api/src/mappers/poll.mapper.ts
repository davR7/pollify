import { PollOutputDto } from "@/dtos/poll-output.dto";
import { Poll } from "@/entities/poll/poll.entity";
import { PersistedPollProps } from "@/entities/poll/poll.props";

export class PollMapper {
  static toDomain(input: PersistedPollProps): Poll {
    return Poll.restore({
      id: input.id,
      title: input.title,
      options: input.options,
      status: input.status,
      startsAt: input.startsAt,
      endsAt: input.endsAt,
      userId: input.userId,
      createdAt: input.createdAt,
    });
  }
  static toCreatePollOutput(input: Poll): PollOutputDto {
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
