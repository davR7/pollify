import { PollOutputDto } from "./poll-output.dto";

export interface ListPollOutputDto {
  polls: Omit<PollOutputDto, "createdAt">[];
}
