import { CreatePollOutputDto } from "@/dtos/create-poll-output.dto";
import { PersistedPollProps } from "@/entities/poll/poll.props";

export class PollMapper {
  static toOutput(input: PersistedPollProps): CreatePollOutputDto {
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
