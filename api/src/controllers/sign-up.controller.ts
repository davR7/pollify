import { SignUpInputDto } from "@/dtos/sign-up-input.dto";
import { SignUpOutputDto } from "@/dtos/sign-up-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { SignUpUseCase } from "@/use-cases/auth/sign-up.use-case";

class CreateUserController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  async handler(
    req: ExpressRequest<SignUpInputDto>,
    res: ExpressResponse<SignUpOutputDto>,
  ) {
    const output = await this.signUpUseCase.execute(req.body);
    return res.status(201).json(output);
  }
}

export { CreateUserController };
