import { z } from "zod";

export const votePollSchema = z.object({
  optionId: z.uuid("Invalid option id."),
});
