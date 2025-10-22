import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .transform((val) => val.replace(/^\+/, "")),
  password: z.string().min(1, { message: "Required" }),
});

export type SignInDto = z.infer<typeof signInSchema>;

export const resetPasswordSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid" }),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z
  .object({
    username: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" })
      .transform((val) => val.replace(/^\+/, "")),
    otp: z
      .string()
      .min(4, { message: "OTP must be at least 4 characters" })
      .max(6, { message: "OTP must be at most 6 characters" }),
    oldpassword: z
      .string()
      .min(8, { message: "Old password must be at least 8 characters" }),
    newpassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  })
  .refine((data) => data.oldpassword !== data.newpassword, {
    message: "New password must be different from old password",
    path: ["newpassword"],
  });

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
