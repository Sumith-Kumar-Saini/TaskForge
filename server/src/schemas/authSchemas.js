import { z } from "zod";

const usernameSanitizer = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .refine((val) => /^[a-z0-9_-]+$/.test(val), {
    message:
      "Username can only contain lowercase letters, numbers, underscores, and hyphens",
  })
  .transform((val) => val.trim().toLowerCase().replace(/\s+/g, "_"));

const emailSanitizer = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email format");

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    username: usernameSanitizer,
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
        .max(128, "Password must not exceed 128 characters"), // avoids excessive length attacks
    })
    .refine((data) => data.email || data.username, {
      message: "Either email or username is required",
      path: ["email"], // points error at email field
    }),
});
