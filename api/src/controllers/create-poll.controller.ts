import { PollInputDto } from "@/dtos/poll-input.dto";
import { PollOutputDto } from "@/dtos/poll-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { CreatePollUseCase } from "@/use-cases/poll/create-poll.use-case";

class CreatePollController {
  constructor(private createPollUseCase: CreatePollUseCase) {}

  async handler(req: ExpressRequest<PollInputDto>, res: ExpressResponse<PollOutputDto>) {
    const body = req.body;
    const userId = res.locals.userId;
    const output = await this.createPollUseCase.execute({ ...body, userId });
    return res.status(201).json(output);
  }
}

export { CreatePollController };
