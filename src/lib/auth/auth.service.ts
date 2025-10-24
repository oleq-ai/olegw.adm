import "server-only";

import { Permission } from "@/data/modules";

import { Fetcher } from "../api/api.service";
import { createSession, destroySession } from "../session/session";
import { getCountryCode, getHashedString } from "../utils";
import {
  ChangePasswordDto,
  ResetPasswordDto,
  SignInDto,
} from "./dto/sign-in.dto";
import { LoginResponse, VerifyResponse } from "./types/auth.types";

export class AuthService {
  constructor(private fetcher = new Fetcher()) {}

  async signIn(values: SignInDto): Promise<void> {
    const pass = await getHashedString(values.password);

    const country = getCountryCode(values.username) ?? "KE";

    const res = await this.fetcher.request<LoginResponse>("/", {
      data: {
        operation: "authenticate",
        username: values.username,
        password: pass,
      },
      country,
    });

    const {
      ukey,
      firstname,
      middlename,
      lastname,
      mobile,
      username,
      email,
      roleid,
      rolename,
      modules: mods,
    } = res;

    const name = `${firstname} ${middlename} ${lastname}`;

    const modules = Array.isArray(mods)
      ? mods
      : (JSON.parse(mods) as Permission[]);

    if ((!modules || modules.length === 0) && !roleid)
      throw new Error("You are not authorized to access this application");

    await createSession({
      ukey,
      name,
      mobile,
      username,
      email,
      role: rolename ?? "admin",
      modules,
      country,
    });
  }

  async signOut(): Promise<void> {
    await destroySession();
  }

  async sendOTP(phone: string): Promise<VerifyResponse> {
    const msisdn = phone.startsWith("+") ? phone : `+${phone}`;

    const res = await this.fetcher.request<VerifyResponse>("/", {
      data: {
        operation: "requestotp",
        msisdn,
      },
    });

    return res;
  }

  async changePassword(values: ChangePasswordDto): Promise<VerifyResponse> {
    const country = getCountryCode(values.username) ?? "KE";

    const oldpassword = await getHashedString(values.oldpassword);
    const newpassword = await getHashedString(values.newpassword);

    const res = await this.fetcher.request<VerifyResponse>("/", {
      data: {
        operation: "changepassword",
        username: values.username,
        otp: values.otp,
        oldpassword,
        newpassword,
      },
      country,
    });

    return res;
  }

  public async resetPassword(values: ResetPasswordDto): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(values);
  }
}
