import "server-only";

import { Fetcher } from "../api/api.service";
import { Response } from "../shared/types";
import { SaveMerchantDto, SaveMerchantResponse } from "./dto/merchant.dto";
import {
  MerchantPerformanceData,
  MerchantPerformanceQuery,
  MerchantPerformanceResponse,
} from "./types/merchant-performance.types";
import {
  MerchantDetails,
  MerchantDetailsResponse,
} from "./types/merchant.types";

export class MerchantService {
  constructor(private fetcher = new Fetcher()) {}

  async getMerchants(): Promise<Response<MerchantDetails[]>> {
    try {
      const res = await this.fetcher.request<{
        status: number;
        data: MerchantDetails[];
        message: string;
      }>("/", {
        data: {
          operation: "getmerchants",
          merchantid: "",
          mobile: "",
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
      if (!res || !res.merchantid || !res.name) {
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
      // If the error message contains "Merchant not found", return a clean error
      if (
        error instanceof Error &&
        error.message.includes("Merchant not found")
      ) {
        return {
          success: false,
          error: "Merchant not found",
        };
      }

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch merchant details",
      };
    }
  }

  async saveMerchant(
    merchantData: SaveMerchantDto
  ): Promise<Response<SaveMerchantResponse>> {
    try {
      const res = await this.fetcher.request<SaveMerchantResponse>("/", {
        data: {
          operation: "savemerchant",
          ...merchantData,
        },
      });

      return { success: true, data: res };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to save merchant",
      };
    }
  }

  async deleteMerchant(
    merchantid: string
  ): Promise<Response<{ message: string }>> {
    try {
      // For delete, we'll use savemerchant with active: "0" and the merchantid
      await this.fetcher.request<SaveMerchantResponse>("/", {
        data: {
          operation: "savemerchant",
          merchantid,
          active: "0", // Set to inactive instead of actual deletion
        },
      });

      return {
        success: true,
        data: { message: "Merchant deactivated successfully" },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete merchant",
      };
    }
  }

  async getMerchantPerformance(
    query: MerchantPerformanceQuery
  ): Promise<Response<MerchantPerformanceData>> {
    try {
      const res = await this.fetcher.request<MerchantPerformanceResponse>("/", {
        data: {
          operation: "getmerchantperformance",
          ...query,
        },
      });

      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch merchant performance",
      };
    }
  }
}
