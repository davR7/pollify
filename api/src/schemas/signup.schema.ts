import z from "zod";

export const signupSchema = z.object({
  fullname: z
    .string({ error: "fullname is required" })
    .min(8, "fullname must contain at least 8 characters."),
  email: z.email({ error: "email is invalid" }).toLowerCase(),
  password: z
    .string({ error: "password is required" })
    .min(8, "password must contain at least 8 characters."),
});
