import "server-only";

import { Fetcher } from "../api/api.service";
import { Response } from "../shared/types";
import {
  Merchant,
  MerchantDetails,
  MerchantDetailsResponse,
  MerchantResponse,
} from "./types/merchant.types";

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

  async getMerchant(
    merchantid: string,
    mobile?: string
  ): Promise<Response<MerchantDetails>> {
    try {
      const res = await this.fetcher.request<MerchantDetailsResponse>("/", {
        data: {
          operation: "getmerchant",
          merchantid,
          mobile: mobile || "",
        },
      });

      // Check if the response has the required fields
      if (!res.merchantid || !res.name) {
        return {
          success: false,
          error: "Merchant not found",
        };
      }

      const merchantDetails: MerchantDetails = {
        merchantid: res.merchantid,
        merchantcode: res.merchantcode,
        publickey: res.publickey,
        name: res.name,
        contactperson: res.contactperson,
        email: res.email,
        mobile: res.mobile,
        active: res.active,
        createdon: res.createdon,
        createdby: res.createdby,
      };

      return { success: true, data: merchantDetails };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch merchant details",
      };
    }
  }
}
