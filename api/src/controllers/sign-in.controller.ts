import { SignInInputDto } from "@/dtos/sign-in-input.dto";
import { SignInOutputDto } from "@/dtos/sign-in-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { SignInUseCase } from "@/use-cases/auth/sign-in.use-case";

class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async handler(req: ExpressRequest<SignInInputDto>, res: ExpressResponse<SignInOutputDto>) {
    const output = await this.signInUseCase.execute(req.body);
    return res.json(output);
  }
}

export { SignInController };
