import { z } from "zod";

export const credentialSchema = z.object({
  name: z.string().min(1, "Credential name is required"),
  value: z.string().min(1, "Credential value is required"),
});

export const saveMerchantAccountSchema = z.object({
  merchantid: z.string().min(1, "Merchant ID is required"),
  accounttype: z.string().min(1, "Account type is required"),
  accountname: z.string().min(1, "Account name is required"),
  accountnumber: z.string().min(1, "Account number is required"),
  bankcode: z.string().min(1, "Bank code is required"),
  active: z.enum(["0", "1"], {
    errorMap: () => ({ message: "Active status must be 0 or 1" }),
  }),
  credentials: z
    .array(credentialSchema)
    .min(1, "At least one credential is required"),
});

export type SaveMerchantAccountDto = z.infer<typeof saveMerchantAccountSchema>;
export type Credential = z.infer<typeof credentialSchema>;

export interface SaveMerchantAccountResponse {
  status: number;
  message: string;
  accountid?: string;
}
