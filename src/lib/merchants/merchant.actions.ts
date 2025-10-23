"use server";

import { getErrorMessage } from "../get-error-message";
import { Response } from "../shared/types";
import {
  SaveMerchantAccountDto,
  SaveMerchantAccountResponse,
} from "./dto/merchant-account.dto";
import { SaveMerchantDto, SaveMerchantResponse } from "./dto/merchant.dto";
import { MerchantService } from "./merchants.service";
import {
  MerchantAccount,
  MerchantAccountsQuery,
} from "./types/merchant-accounts.types";
import {
  MerchantPerformanceData,
  MerchantPerformanceQuery,
} from "./types/merchant-performance.types";
import { Merchant, MerchantDetails } from "./types/merchant.types";

const merchantService = new MerchantService();

export async function getMerchantsAction(): Promise<Response<Merchant[]>> {
  try {
    const res = await merchantService.getMerchants();
    return res;
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getMerchantAction(
  merchantid: string,
  mobile?: string
): Promise<Response<MerchantDetails>> {
  try {
    const res = await merchantService.getMerchant(merchantid, mobile);
    return res;
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function saveMerchantAction(
  merchantData: SaveMerchantDto
): Promise<Response<SaveMerchantResponse>> {
  try {
    const res = await merchantService.saveMerchant(merchantData);
    return res;
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteMerchantAction(
  merchantid: string
): Promise<Response<{ message: string }>> {
  try {
    const res = await merchantService.deleteMerchant(merchantid);
    return res;
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getMerchantPerformanceAction(
  query: MerchantPerformanceQuery
): Promise<Response<MerchantPerformanceData>> {
  try {
    const res = await merchantService.getMerchantPerformance(query);
    return res;
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getMerchantAccountsAction(
  query: MerchantAccountsQuery
): Promise<Response<MerchantAccount[]>> {
  try {
    const res = await merchantService.getMerchantAccounts(query);
    return res;
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function saveMerchantAccountAction(
  accountData: SaveMerchantAccountDto
): Promise<Response<SaveMerchantAccountResponse>> {
  try {
    const res = await merchantService.saveMerchantAccount(accountData);
    return res;
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
