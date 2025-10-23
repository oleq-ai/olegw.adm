import "server-only";

import { Fetcher } from "../api/api.service";
import { Response } from "../shared/types";
import { Merchant, MerchantResponse } from "./types/merchant.types";

export class MerchantService {
  constructor(private fetcher = new Fetcher()) {}

  async getMerchants(): Promise<Response<Merchant[]>> {
    try {
      const res = await this.fetcher.request<MerchantResponse>("/", {
        data: {
          operation: "getusers",
        },
      });

      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch merchants",
      };
    }
  }
}
