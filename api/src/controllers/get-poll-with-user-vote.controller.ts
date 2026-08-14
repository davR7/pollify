import { GetPollWithUserVoteInputDto } from "@/dtos/get-poll-with-user-vote-input.dto";
import { GetPollWithUserVoteOutputDto } from "@/dtos/get-poll-with-user-vote-output.dto";
import { GetPollWithUserVoteParamsDto } from "@/dtos/get-poll-with-user-vote-params.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { GetPollWithUserVoteUseCase } from "@/use-cases/vote/get-poll-with-user-vote.use-case";

class GetPollWithUserVoteController {
  constructor(private getPollWithUserVoteUseCase: GetPollWithUserVoteUseCase) {}

  async handler(
    req: ExpressRequest<GetPollWithUserVoteInputDto>,
    res: ExpressResponse<GetPollWithUserVoteOutputDto>,
  ) {
    const { pollId } = req.params as GetPollWithUserVoteParamsDto;
    const userId = res.locals.userId;
    const output = await this.getPollWithUserVoteUseCase.execute({ pollId, userId });
    return res.json(output);
  }
}

export { GetPollWithUserVoteController };
