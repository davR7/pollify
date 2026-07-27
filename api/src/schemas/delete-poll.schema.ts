import { z } from "zod";

export const deletePollSchema = z.object({
  id: z.uuid("Invalid poll id."),
});
