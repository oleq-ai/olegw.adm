import "server-only";

import { cache } from "react";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import https from "https";
import isEmpty from "lodash.isempty";
import { createHash } from "node:crypto";

import env from "@/config/server.env";

import { getSession } from "../session/session";
import { Logger } from "../shared/logger";
import { RequestOptions } from "./api.type";

export class Fetcher {
  private apiUri: ReturnType<typeof axios.create>;

  constructor(apiUri?: ReturnType<typeof axios.create>) {
    this.apiUri =
      apiUri ||
      axios.create({
        baseURL: env.API_URL,
        httpsAgent: new https.Agent({
          rejectUnauthorized: env.SSL_VERIFY,
        }),
      });
  }

  private logger = new Logger("API Service");

  private generateTokens(
    operation: string,
    reference?: string
  ): {
    reference: string;
    XMAUTH: string;
  } {
    const ref = reference ?? `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const authSecret = env.AUTH_SECRET;
    const MAuth = `${ref}${operation}${authSecret}`;

    const XMAUTH = createHash("sha512")
      .update(MAuth)
      .digest("hex")
      .toUpperCase();

    return { reference: ref, XMAUTH };
  }

  public request = cache(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T = any, TData = Record<string, any>>(
      url: string,
      options: RequestOptions<TData>
    ): Promise<T> => {
      try {
        const { operation, reference: ref } = options.data;

        const session = await getSession();
        const ukey = session?.ukey;

        const countryCode = session?.country;

        const {
          data,
          headers,
          method = "POST",
          country = countryCode ?? "KE",
        } = options;

        const { reference, XMAUTH } = this.generateTokens(operation, ref);

        const requestOptions: AxiosRequestConfig = {
          url,
          method,
          data: { ...data, reference, countrycode: country, operation, ukey },
          headers: {
            CHANNEL: "admin",
            XMAUTH,
            "Content-Type": "application/json",
            ...headers,
          },
        };

        this.logger.info("request", requestOptions);

        const response = await this.apiUri.request(requestOptions);

        const resp = response?.data;

        if (!resp || isEmpty(resp)) throw new Error("Resource not found.");

        if (resp.status && resp.status !== 200)
          throw new Error(resp.message || "An error occurred");

        this.logger.info("response", resp);

        return resp;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.code) {
            if (error.code === "ETIMEDOUT") {
              const message = "Request timed out. Please try again later.";
              this.logger.error(message, error);
              throw new Error(message);
            }

            if (error.code === "ENETUNREACH" || error.code === "EHOSTUNREACH") {
              const message =
                "Network is unreachable. Please check your internet connection.";
              this.logger.error(message, error);
              throw new Error(message);
            }
          }

          const message = error.message;
          this.logger.error(message, error);
          throw new Error(message);
        }

        if (error instanceof Error) {
          const message = error.message;
          this.logger.error(message, error);
          throw new Error(message);
        }

        const message = "An unexpected error occurred";
        this.logger.error(message, error);
        throw new Error(message);
      }
    }
  );
}
