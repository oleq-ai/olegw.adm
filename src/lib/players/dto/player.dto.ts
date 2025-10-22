import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

import { PaymentMode } from "../types/user.types";

export const issueBonusDto = z.object({
  privatekey: z.string().min(1, "Required"),
  bonus: z
    .string()
    .min(1, "Required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
  description: z.string().min(1, "Required"),
});

export type IssueBonusDto = z.infer<typeof issueBonusDto>;

export const bonusConfigDto = z.object({
  bonusref: z.string().min(1, "Bonus reference is required"),
  active: z.enum(["0", "1"], {
    required_error: "Please select active status",
  }),
  name: z.string().min(1, "Bonus name is required"),
  bonustype: z.enum(["DEPOSIT", "REFERAL", "REGISTRATION"], {
    required_error: "Please select bonus type",
  }),
  bonusmode: z.enum(["FLATFEE", "PERCENTAGE"], {
    required_error: "Please select bonus mode",
  }),
  condition: z.enum(["MIN", "MAX", "EQUAL"], {
    required_error: "Please select condition type",
  }),
  conditionval: z
    .string()
    .min(1, "Condition value is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Must be a positive number"
    ),
  bonus: z
    .string()
    .min(1, "Bonus value is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Must be a positive number"
    ),
  description: z.string().min(1, "Description is required"),
  startdate: z.string().min(1, "Start date is required"),
  enddate: z.string().min(1, "End date is required"),
  starttime: z.string().min(1, "Start time is required"),
  endtime: z.string().min(1, "End time is required"),
  repeat: z.string().min(1, "Repeat frequency is required"),
});

export type BonusConfigDto = z.infer<typeof bonusConfigDto>;

export const depositDto = z.object({
  privatekey: z.string().min(1, "Required"),
  mobile: z
    .string()
    .min(1, "Required")
    .refine((val) => isValidPhoneNumber(val), "Invalid phone number"),
  amount: z
    .string()
    .min(1, "Required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
  paymentdate: z.string().min(1, "Required"),
  paymentreference: z.string().min(1, "Required"),
  paymentmode: z.nativeEnum(PaymentMode, {
    message: "Invalid payment mode",
  }),
  shortcode: z.string().min(1, "Required"),
  paidby: z.string().min(1, "Required"),
});

export type DepositDto = z.infer<typeof depositDto>;

export interface ClientSettingsDto {
  publickey: string;
  settings: {
    withdrawal: boolean;
    deposit: boolean;
    play: boolean;
    login: boolean;
    testmodedisabled: boolean;
  };
}
