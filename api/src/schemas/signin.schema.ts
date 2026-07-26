import z from "zod";

export const signinSchema = z.object({
  email: z.email({ error: "email is invalid" }).toLowerCase(),
  password: z
    .string({ error: "password is required" })
    .min(8, "password must contain at least 8 characters."),
});
