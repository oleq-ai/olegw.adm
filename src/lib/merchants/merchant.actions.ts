"use server";

import { getErrorMessage } from "../get-error-message";
import { Response } from "../shared/types";
import { MerchantService } from "./merchants.service";
import { Merchant } from "./types/merchant.types";

const merchantService = new MerchantService();

export async function getMerchantsAction(): Promise<Response<Merchant[]>> {
  try {
    const res = await merchantService.getMerchants();
    return res;
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
