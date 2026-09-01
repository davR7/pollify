import { VoteInputDto } from "@/dtos/vote-input.dto";
import { VoteOutputDto } from "@/dtos/vote-output.dto";
import { VoteParamsDto } from "@/dtos/vote-params.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { CreateVoteUseCase } from "@/use-cases/vote/create-vote.use-case";

class CreateVoteController {
  constructor(private createVoteUseCase: CreateVoteUseCase) {}

  async handler(req: ExpressRequest<VoteInputDto>, res: ExpressResponse<VoteOutputDto>) {
    const body = req.body;
    const { pollId } = req.params as VoteParamsDto;
    const userId = res.locals.userId;
    const output = await this.createVoteUseCase.execute({ ...body, pollId, userId });

    req.log.info(
      {
        pollId,
        optionId: body.optionId,
        userId,
      },
      "Vote registered",
    );

    return res.status(201).json(output);
  }
}

export { CreateVoteController };
