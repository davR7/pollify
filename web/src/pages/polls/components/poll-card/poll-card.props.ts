import type { PollWithUser } from "@/types/poll.types";

export interface PollCardProps {
  poll: PollWithUser;
  showAuthor?: boolean;
  onEdit?: () => void;
}
