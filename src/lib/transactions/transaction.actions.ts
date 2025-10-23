"use server";

import { getErrorMessage } from "../get-error-message";
import { PaginatedResponse, Response } from "../shared/types";
import { TransactionQuery } from "./dto/transaction.dto";
import { TransactionService } from "./transactions.service";
import { Transaction } from "./types/transaction.types";

const transactionService = new TransactionService();

export async function getTransactionsAction(
  query: TransactionQuery
): Promise<Response<PaginatedResponse<Transaction>>> {
  try {
    const res = await transactionService.findAll(query);
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getPendingTransactionsAction(): Promise<
  Response<PaginatedResponse<Transaction>>
> {
  try {
    const res = await transactionService.getPendingTransactions();
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getFailedTransactionsAction(): Promise<
  Response<PaginatedResponse<Transaction>>
> {
  try {
    const res = await transactionService.getFailedTransactions();
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getCompletedTransactionsAction(): Promise<
  Response<PaginatedResponse<Transaction>>
> {
  try {
    const res = await transactionService.getCompletedTransactions();
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
