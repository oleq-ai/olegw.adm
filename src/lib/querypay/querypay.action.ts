"use server";

import { getErrorMessage } from "../get-error-message";
import { Response } from "../shared/types";
import { QueryPaymentDto } from "./querypay.dto";
import { QueryPayService } from "./querypay.service";

const querypayService = new QueryPayService();

export async function queryPaymentActions(
  values: QueryPaymentDto
): Promise<Response<{ message: string }>> {
  try {
    const result = await querypayService.queryPayment(values);
    return { success: true, data: { message: result.message } };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
