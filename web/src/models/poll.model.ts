export type PollStatus = "OPEN" | "CLOSED" | "DRAFT";

export interface Poll {
  id: string;
  title: string;
  options: string[];
  status: PollStatus;
  startsAt: string;
  endsAt: string;
  createdAt: string;
}
