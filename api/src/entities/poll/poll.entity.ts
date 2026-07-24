import { PersistedPollProps, PollProps } from "./poll.props";

class Poll {
  private constructor(_props: PollProps | PersistedPollProps) {}

  static create(props: PollProps) {
    return new Poll(props);
  }

  static restore(props: PersistedPollProps) {
    return new Poll(props);
  }
}

export { Poll };
