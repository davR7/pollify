import { LoginUserInputDto } from "@/dtos/login-user-input.dto";
import { LoginUserOutputDto } from "@/dtos/login-user-output.dto";
import { ExpressRequest, ExpressResponse } from "@/infra/http/types";
import { LoginUserUseCase } from "@/use-cases/user/login-user.use-case";

class LoginUserController {
  constructor(private loginUseUseCase: LoginUserUseCase) {}

  async handler(req: ExpressRequest<LoginUserInputDto>, res: ExpressResponse<LoginUserOutputDto>) {
    const output = await this.loginUseUseCase.execute(req.body);
    return res.json(output);
  }
}

export { LoginUserController };
