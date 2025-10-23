import "server-only";

import { Fetcher } from "../api/api.service";
import { Meta, PaginatedResponse } from "../shared/types";
import { TransactionQuery } from "./dto/transaction.dto";
import { Transaction, TransactionResponse } from "./types/transaction.types";

export class TransactionService {
  constructor(private fetcher = new Fetcher()) {}

  async findAll({
    page = 1,
    pageSize = 10,
    ...rest
  }: TransactionQuery): Promise<PaginatedResponse<Transaction>> {
    await this.fetcher.request<Record<string, never>>("/", {
      data: {
        operation: "gettransactions",
        page: page - 1,
        rows: pageSize,
        ...rest,
      },
    });

    // Handle empty response format
    const data: Transaction[] = [];
    const totalrows = 0;

    const pageCount = Math.ceil(Number(totalrows) / Number(pageSize));

    const meta: Meta = {
      pageCount,
      currentPage: page,
      itemCount: totalrows,
      pageSize,
    };
    return { data, meta };
  }

  async getPendingTransactions(
    startDate?: string,
    endDate?: string,
    page: number = 1,
    pageSize: number = 30
  ): Promise<PaginatedResponse<Transaction>> {
    const res = await this.fetcher.request<TransactionResponse>("/", {
      data: {
        operation: "getpendingtransactions",
        startdate: startDate || "",
        enddate: endDate || "",
        pagenumber: page.toString(),
        pagesize: pageSize.toString(),
      },
    });

    const data = res.data || [];
    const pagination = res.pagination;

    const meta: Meta = {
      pageCount: pagination.totalpages,
      currentPage: pagination.currentpage,
      itemCount: pagination.totalrecords,
      pageSize: pagination.pagesize,
    };
    return { data, meta };
  }

  async getFailedTransactions(
    startDate?: string,
    endDate?: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<Transaction>> {
    const res = await this.fetcher.request<TransactionResponse>("/", {
      data: {
        operation: "getfailedtransactions",
        startdate: startDate || "",
        enddate: endDate || "",
        pagenumber: page.toString(),
        pagesize: pageSize.toString(),
      },
    });

    const data = res.data || [];
    const pagination = res.pagination;

    const meta: Meta = {
      pageCount: pagination.totalpages,
      currentPage: pagination.currentpage,
      itemCount: pagination.totalrecords,
      pageSize: pagination.pagesize,
    };
    return { data, meta };
  }

  async getCompletedTransactions(
    startDate?: string,
    endDate?: string,
    page: number = 1,
    pageSize: number = 30
  ): Promise<PaginatedResponse<Transaction>> {
    const res = await this.fetcher.request<TransactionResponse>("/", {
      data: {
        operation: "getcompletedtransactions",
        startdate: startDate || "",
        enddate: endDate || "",
        pagenumber: page.toString(),
        pagesize: pageSize.toString(),
      },
    });

    const data = res.data || [];
    const pagination = res.pagination;

    const meta: Meta = {
      pageCount: pagination.totalpages,
      currentPage: pagination.currentpage,
      itemCount: pagination.totalrecords,
      pageSize: pagination.pagesize,
    };
    return { data, meta };
  }

  async getTransaction(transactionId: string): Promise<Transaction> {
    const res = await this.fetcher.request<Transaction>("/", {
      data: {
        operation: "gettransaction",
        transactionid: transactionId,
      },
    });

    return res;
  }
}
