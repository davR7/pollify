import { apiPrivate } from "@/libs/api";
import type { MePollsResponse, PollsResponse } from "@/types/poll.types";

export async function getPollsWithUser(): Promise<MePollsResponse> {
  const response = await apiPrivate.get("/me/polls");
  console.log(response.data);
  return response.data;
}

export async function getPolls(): Promise<PollsResponse> {
  const response = await apiPrivate.get("/polls");
  return response.data;
}
