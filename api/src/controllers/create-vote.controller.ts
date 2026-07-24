import { CreateVoteInputDto } from "@/dtos/create-vote-input.dto";
import { CreateVoteOutputDto } from "@/dtos/create-vote-output.dto";
import { CreateVoteParamsDto } from "@/dtos/create-vote-params.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { CreateVoteUseCase } from "@/use-cases/vote/create-vote.use-case";

class CreateVoteController {
  constructor(private createVoteUseCase: CreateVoteUseCase) {}

  async handler(
    req: ExpressRequest<CreateVoteInputDto, CreateVoteParamsDto>,
    res: ExpressResponse<CreateVoteOutputDto>,
  ) {
    const body = req.body;
    const pollId = req.params.pollId;
    const userId = res.locals.userId;
    const output = await this.createVoteUseCase.execute({ ...body, pollId, userId });
    return res.status(201).json(output);
  }
}

export { CreateVoteController };
