import { DeleteVoteInputDto } from "@/dtos/delete-poll-input.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { DeletePollUseCase } from "@/use-cases/poll/delete-poll.use-case";

class DeletePollController {
  constructor(private deletePollUseCase: DeletePollUseCase) {}

  async handler(req: ExpressRequest<unknown>, res: ExpressResponse<void>) {
    const { id } = req.params as DeleteVoteInputDto;
    await this.deletePollUseCase.execute({ id });
    return res.sendStatus(200);
  }
}

export { DeletePollController };
