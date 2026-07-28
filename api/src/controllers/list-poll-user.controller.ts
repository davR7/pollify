import { ListPollOutputDto } from "@/dtos/list-poll-output.dto";
import { ListPollUserInputDto } from "@/dtos/list-poll-user-input.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { ListPollUserUseCase } from "@/use-cases/poll/list-poll-user.use-case";

class ListPollUserController {
  constructor(private listPollUserUseCase: ListPollUserUseCase) {}

  async handler(
    _req: ExpressRequest<ListPollUserInputDto>,
    res: ExpressResponse<ListPollOutputDto[]>,
  ) {
    const userId = res.locals.userId;
    const output = await this.listPollUserUseCase.execute({ userId });
    return res.json(output);
  }
}

export { ListPollUserController };
