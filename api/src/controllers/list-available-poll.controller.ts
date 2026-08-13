import { ListPollOutputDto } from "@/dtos/list-poll-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { ListAvailablePollUseCase } from "@/use-cases/poll/list-available-poll.use-case";

class ListAvailablePollController {
  constructor(private listPollUseCase: ListAvailablePollUseCase) {}

  async handler(_req: ExpressRequest<unknown>, res: ExpressResponse<ListPollOutputDto>) {
    const output = await this.listPollUseCase.execute();
    return res.json(output);
  }
}

export { ListAvailablePollController };
