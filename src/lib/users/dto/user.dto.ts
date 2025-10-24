import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

import { PaginationDto } from "@/lib/shared/dto/pagination.dto";

import { Gender } from "../types/user.types";

const baseUserSchema = z.object({
  userkey: z.string().optional(),
  firstname: z.string().min(1, { message: "Required" }),
  middlename: z.string().optional(),
  lastname: z.string().min(1, { message: "Required" }),
  username: z.string().min(1, { message: "Required" }),
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid" }),
  mobile: z
    .string()
    .min(1, { message: "Required" })
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .optional(),
  gender: z.nativeEnum(Gender),
  roleid: z.string().min(1, { message: "Required" }),
  modules: z.array(z.string()).optional(),
  active: z.boolean().optional(),
  password: z.string().min(1, { message: "Required" }),
  confirmPassword: z.string().min(1, { message: "Required" }),
  // Additional fields for API compatibility
  idtype: z.string().optional(),
  idnumber: z.string().optional(),
  address: z.string().optional(),
  county: z.string().optional(),
  postalcode: z.string().optional(),
  city: z.string().optional(),
  stations: z.array(z.string()).optional(),
});

export const createUserSchema = baseUserSchema
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    ({ roleid, modules }) => {
      if (roleid === "custom")
        return Array.isArray(modules) && modules.length > 0;
      return true;
    },
    { message: "Required", path: ["modules"] }
  );

export const partialUserSchema = baseUserSchema
  .partial()
  .refine(
    (data) => {
      // Only validate password match if both are provided
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] }
  )
  .refine(
    (data) => {
      if (data.roleid === "custom")
        return (
          !!data.modules &&
          Array.isArray(data.modules) &&
          data.modules.length > 0
        );
      return true;
    },
    { message: "Required", path: ["modules"] }
  );

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type PartialUserDto = z.infer<typeof partialUserSchema>;

export interface UserQuery extends PaginationDto {
  filter?: string;
}
