import { z } from "zod";

export const saveMerchantSchema = z.object({
  merchantcode: z.string().min(1, "Merchant code is required"),
  name: z.string().min(1, "Merchant name is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  active: z.enum(["0", "1"], {
    errorMap: () => ({ message: "Active status must be 0 or 1" }),
  }),
  merchantid: z.string().optional(), // Optional for new merchants
});

export type SaveMerchantDto = z.infer<typeof saveMerchantSchema>;

export interface SaveMerchantResponse {
  status: number;
  message: string;
  merchantid?: string;
  merchantcode?: string;
}
