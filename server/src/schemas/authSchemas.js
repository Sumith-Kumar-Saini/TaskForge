import { z } from "zod";

const usernameSanitizer = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long." })
  .max(20, { message: "Username must be at most 20 characters long." })
  .regex(/^[a-zA-Z0-9_-]+$/, {
    message:
      "Username can only contain alphanumeric characters and underscores.",
  });

const emailSanitizer = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email format");

export const registerSchema = z.object({
  body: z.object({
    email: emailSanitizer,
    username: usernameSanitizer,
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters"), // avoids excessive length attacks
  }),
});

export const loginSchema = z.object({
  body: z
    .object({
      // Normalize and validate email
      email: emailSanitizer.optional(),

      // Normalize and validate username
      username: usernameSanitizer.optional(),

      // Strong password rules
      password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password must not exceed 128 characters"),
    })
    .refine((data) => data.email || data.username, {
      message: "Either email or username is required",
      path: ["email"], // points error at email field
    }),
});
