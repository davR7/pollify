import type { Poll } from "@/models/poll.model";

export interface PollUser {
  id: string;
  fullname: string;
}

export interface PollWithUser extends Poll {
  user?: PollUser;
}

export type ModalPollStatus = "DRAFT" | "OPEN";

export interface PollStatusPayload {
  status: ModalPollStatus;
  startsAt: string;
  endsAt: string;
}

export interface FormPoll extends Omit<Poll, "status"> {
  status: ModalPollStatus;
}

export interface MyPollsResponse {
  polls: FormPoll[];
}

export interface ListPollResponse {
  polls: PollWithUser[];
}

export interface UpdatePollResponse extends Poll {}
