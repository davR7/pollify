export const PollStatus = {
  DRAFT: "DRAFT",
  OPEN: "OPEN",
  CLOSED: "CLOSED",
} as const;

export type PollStatus = (typeof PollStatus)[keyof typeof PollStatus];
