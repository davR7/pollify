import type { FormPoll } from "@/types/poll.types";

export interface UpdatePollModalProps {
  onClose: () => void;
  poll: FormPoll;
}
