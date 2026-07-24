import { PersistedVoteProps, VoteProps } from "./vote.props";

class Vote {
  private constructor(_props: VoteProps | PersistedVoteProps) {}

  static create(props: VoteProps) {
    return new Vote(props);
  }

  static restore(props: PersistedVoteProps) {
    return new Vote(props);
  }
}

export { Vote };
