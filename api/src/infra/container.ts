import { GetCurrentUserUseCase } from "@/use-cases/auth/get-current-user.use-case";
import { RefreshTokenUseCase } from "@/use-cases/auth/refresh-token.use-case";
import { SignInUseCase } from "@/use-cases/auth/sign-in.use-case";
import { SignUpUseCase } from "@/use-cases/auth/sign-up.use-case";
import { CreatePollUseCase } from "@/use-cases/poll/create-poll.use-case";
import { DeletePollUseCase } from "@/use-cases/poll/delete-poll.use-case";
import { ListAvailablePollUseCase } from "@/use-cases/poll/list-available-poll.use-case";
import { ListPollUseCase } from "@/use-cases/poll/list-poll.use-case";
import { ListPollUserUseCase } from "@/use-cases/poll/list-poll-user.use-case";
import { UpdatePollUseCase } from "@/use-cases/poll/update-poll.use-case";
import { CreateVoteUseCase } from "@/use-cases/vote/create-vote.use-case";
import { GetPollWithUserVoteUseCase } from "@/use-cases/vote/get-poll-with-user-vote.use-case";
import { PollPrismaRepository } from "./repositories/poll-prisma.repository";
import { UserPrismaRepository } from "./repositories/user-prisma.repository";
import { VotePrismaRepository } from "./repositories/vote-prisma.repository";
import { BcryptHasher } from "./security/bcrypt.hasher";
import { JwtTokenProvider } from "./security/jwt-token-provider";

class Container {
  //repository
  private readonly userRepository = new UserPrismaRepository();
  private readonly pollRepository = new PollPrismaRepository();
  private readonly voteRepository = new VotePrismaRepository();

  //services
  private readonly bcryptHasher = new BcryptHasher();
  private readonly jwtTokenProvider = new JwtTokenProvider(
    process.env.ACCESS_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_SECRET,
  );

  //use-case
  private readonly signUpUseCase = new SignUpUseCase(this.userRepository, this.bcryptHasher);
  private readonly signInUseCase = new SignInUseCase(
    this.userRepository,
    this.bcryptHasher,
    this.jwtTokenProvider,
  );
  private readonly refreshTokenUseCase = new RefreshTokenUseCase(
    this.userRepository,
    this.jwtTokenProvider,
  );
  private readonly currentUserUseCase = new GetCurrentUserUseCase(this.userRepository);
  private readonly createPollUseCase = new CreatePollUseCase(this.pollRepository);
  private readonly listPollUseCase = new ListPollUseCase(this.pollRepository);
  private readonly listAvailablePollUseCase = new ListAvailablePollUseCase(this.pollRepository);
  private readonly listPollUserUseCase = new ListPollUserUseCase(this.pollRepository);
  private readonly deletePollUseCase = new DeletePollUseCase(this.pollRepository);
  private readonly updatePollUseCase = new UpdatePollUseCase(this.pollRepository);
  private readonly createVoteUseCase = new CreateVoteUseCase(
    this.voteRepository,
    this.pollRepository,
  );
  private readonly PollWithUserVoteUseCase = new GetPollWithUserVoteUseCase(
    this.voteRepository,
    this.pollRepository,
  );

  //getter methods
  getSignUpUseCase() {
    return this.signUpUseCase;
  }
  getSignInUseCase() {
    return this.signInUseCase;
  }
  getRefreshTokenUseCase() {
    return this.refreshTokenUseCase;
  }
  getCurrentUserUseCase() {
    return this.currentUserUseCase;
  }
  getCreatePollUseCase() {
    return this.createPollUseCase;
  }
  getListPollUseCase() {
    return this.listPollUseCase;
  }
  getListAvailablePollUseCase() {
    return this.listAvailablePollUseCase;
  }
  getListPollUserUseCase() {
    return this.listPollUserUseCase;
  }
  getUpdatePollUseCase() {
    return this.updatePollUseCase;
  }
  getDeletePollUseCase() {
    return this.deletePollUseCase;
  }
  getCreateVoteUseCase() {
    return this.createVoteUseCase;
  }
  getPollWithUserVoteUseCase() {
    return this.PollWithUserVoteUseCase;
  }
}

export const container = new Container();
export type ContainerType = typeof container;
