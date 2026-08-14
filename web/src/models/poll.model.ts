export type PollStatus = "OPEN" | "CLOSED" | "DRAFT";

interface PollOption {
  id: string;
  text: string;
  pollId: string;
  createdAt: string;
}

export interface Poll {
  id: string;
  title: string;
  options: PollOption[];
  status: PollStatus;
  startsAt: string;
  endsAt: string;
  createdAt: string;
}
