import { ListPollOutputDto } from "@/dtos/list-poll-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { ListPollUseCase } from "@/use-cases/poll/list-poll.use-case";

class ListPollController {
  constructor(private listPollUseCase: ListPollUseCase) {}

  async handler(_req: ExpressRequest<unknown>, res: ExpressResponse<ListPollOutputDto>) {
    const output = await this.listPollUseCase.execute();
    return res.json(output);
  }
}

export { ListPollController };
