import { UpdatePollInputDto } from "@/dtos/update-poll-input.dto";
import { UpdatePollOutputDto } from "@/dtos/update-poll-output.dto";
import { UpdatePollParamsDto } from "@/dtos/update-poll-params.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { UpdatePollUseCase } from "@/use-cases/poll/update-poll.use-case";

class UpdatePollController {
  constructor(private updatePollUseCase: UpdatePollUseCase) {}

  async handler(
    req: ExpressRequest<UpdatePollInputDto>,
    res: ExpressResponse<UpdatePollOutputDto>,
  ) {
    const body = req.body;
    const { id } = req.params as UpdatePollParamsDto;
    const output = await this.updatePollUseCase.execute(id, body);
    return res.json(output);
  }
}

export { UpdatePollController };
