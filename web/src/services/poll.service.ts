import { apiPrivate } from "@/libs/api";
import type {
  CreatePoll,
  CreatePollResponse,
  GetPollVoteDetailsResponse,
  ListPollResponse,
  MyPollsResponse,
  PollStatusPayload,
  UpdatePollResponse,
} from "@/types/poll.types";

export async function getMyPolls(): Promise<MyPollsResponse> {
  const response = await apiPrivate.get("/me/polls");
  return response.data;
}

export async function getPollsWithUser(): Promise<ListPollResponse> {
  const response = await apiPrivate.get("/polls");
  return response.data;
}

export async function createPoll(input: CreatePoll): Promise<CreatePollResponse> {
  const response = await apiPrivate.post("/polls", input);
  return response.data;
}

export async function uptadePoll({
  id,
  payload,
}: {
  id: string;
  payload: PollStatusPayload;
}): Promise<UpdatePollResponse> {
  const response = await apiPrivate.patch(`/polls/${id}`, payload);
  return response.data;
}

export async function getPollVoteDetails(pollId: string): Promise<GetPollVoteDetailsResponse> {
  const response = await apiPrivate.get(`/polls/${pollId}/votes`);
  return response.data;
}

export async function votePoll({ pollId, optionId }: { pollId: string; optionId: string }) {
  const response = await apiPrivate.post(`/polls/${pollId}/votes`, { optionId });
  return response.data;
}
