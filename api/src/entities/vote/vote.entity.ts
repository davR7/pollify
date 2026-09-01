import { PersistedVoteProps, VoteProps } from "./vote.props";

class Vote {
  private constructor(private props: PersistedVoteProps) {}

  static create(props: VoteProps): Vote {
    return new Vote({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });
  }

  static restore(props: PersistedVoteProps): Vote {
    return new Vote(props);
  }

  get id(): string {
    return this.props.id;
  }

  get optionId(): string {
    return this.props.optionId;
  }

  get pollId(): string {
    return this.props.pollId;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

export { Vote };
