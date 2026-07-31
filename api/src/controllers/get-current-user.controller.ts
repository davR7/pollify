import { GetCurrentUserOutputDto } from "@/dtos/get-current-user-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { GetCurrentUserUseCase } from "@/use-cases/user/get-current-user.use-case";

class GetCurrentUserController {
  constructor(private getCurrentUserUseCase: GetCurrentUserUseCase) {}

  async handler(_req: ExpressRequest<unknown>, res: ExpressResponse<GetCurrentUserOutputDto>) {
    const userId = res.locals.userId;
    const output = await this.getCurrentUserUseCase.execute({ userId });
    return res.json(output);
  }
}

export { GetCurrentUserController };
