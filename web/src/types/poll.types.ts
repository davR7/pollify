import type { Poll } from "@/models/poll.model";

interface PollUser {
  id: string;
  fullname: string;
}

interface PollWithUser extends Poll {
  user: PollUser;
}

export interface PollsResponse {
  polls: PollWithUser[];
}

export interface MePollsResponse {
  polls: Poll[];
}
