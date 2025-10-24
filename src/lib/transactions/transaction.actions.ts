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

export async function getPendingTransactionsAction(
  startDate?: string,
  endDate?: string,
  page: number = 1,
  pageSize: number = 30
): Promise<Response<PaginatedResponse<Transaction>>> {
  try {
    const res = await transactionService.getPendingTransactions(
      startDate,
      endDate,
      page,
      pageSize
    );
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getFailedTransactionsAction(
  startDate?: string,
  endDate?: string,
  page: number = 1,
  pageSize: number = 20
): Promise<Response<PaginatedResponse<Transaction>>> {
  try {
    const res = await transactionService.getFailedTransactions(
      startDate,
      endDate,
      page,
      pageSize
    );
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getCompletedTransactionsAction(
  startDate?: string,
  endDate?: string,
  page: number = 1,
  pageSize: number = 30
): Promise<Response<PaginatedResponse<Transaction>>> {
  try {
    const res = await transactionService.getCompletedTransactions(
      startDate,
      endDate,
      page,
      pageSize
    );
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getTransactionAction(
  transactionId: string
): Promise<Response<Transaction>> {
  try {
    const res = await transactionService.getTransaction(transactionId);
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
