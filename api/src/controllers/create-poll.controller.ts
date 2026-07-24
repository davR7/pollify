import { CreatePollInputDto } from "@/dtos/create-poll-input.dto";
import { CreatePollOutputDto } from "@/dtos/create-poll-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { CreatePollUseCase } from "@/use-cases/poll/create-poll.use-case";

class CreatePollController {
  constructor(private createPollUseCase: CreatePollUseCase) {}

  async handler(
    req: ExpressRequest<CreatePollInputDto>,
    res: ExpressResponse<CreatePollOutputDto>,
  ) {
    const body = req.body;
    const userId = res.locals.userId;
    const output = await this.createPollUseCase.execute({ ...body, userId });
    return res.status(201).json(output);
  }
}

export { CreatePollController };
