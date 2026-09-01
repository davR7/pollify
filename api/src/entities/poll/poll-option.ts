import { OptionProps, PersistedOption } from "./poll.props";

class PollOption {
  private constructor(private props: PersistedOption) {}

  public static create(props: OptionProps): PollOption {
    return new PollOption({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });
  }

  public static restore(props: PersistedOption): PollOption {
    return new PollOption(props);
  }

  get id(): string {
    return this.props.id;
  }

  get text(): string {
    return this.props.text;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

export { PollOption };
