import { PersistedOption, PersistedPollProps, PollProps } from "./poll.props";
import { PollOption } from "./poll-option";
import { PollStatus } from "./poll-status";

class Poll {
  private constructor(private props: PersistedPollProps) {}

  static create(props: PollProps): Poll {
    return new Poll({
      ...props,
      id: crypto.randomUUID(),
      options: props.options.map((text) => PollOption.create(text)),
      status: props.status ?? PollStatus.DRAFT,
      createdAt: new Date(),
    });
  }

  static restore(props: PersistedPollProps): Poll {
    return new Poll(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get options(): PersistedOption[] {
    return this.props.options;
  }

  get status(): PollStatus {
    return this.props.status;
  }

  get startsAt(): Date {
    return this.props.startsAt;
  }

  get endsAt(): Date {
    return this.props.endsAt;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

export { Poll };
