import "server-only";

import { Fetcher } from "../api/api.service";
import { QueryPaymentDto } from "./querypay.dto";

export class QueryPayService {
  constructor(private fetcher = new Fetcher()) {}
  async queryPayment(values: QueryPaymentDto) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
    }>("/", { data: { operation: "querypayment", ...values } });

    return res;
  }
}
