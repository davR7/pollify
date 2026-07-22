import { CreateUserInputDto } from "@/dtos/create-user-input.dto";
import { CreateUserOutputDto } from "@/dtos/create-user-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { CreateUserUseCase } from "@/use-cases/user/create-user.use-case";

class CreateUserController {
  constructor(private createUseUseCase: CreateUserUseCase) {}

  async handler(
    req: ExpressRequest<CreateUserInputDto>,
    res: ExpressResponse<CreateUserOutputDto>,
  ) {
    const output = await this.createUseUseCase.execute(req.body);
    return res.status(201).json(output);
  }
}

export { CreateUserController };
