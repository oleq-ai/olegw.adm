import "server-only";

import crypto from "node:crypto";

import { Fetcher } from "../api/api.service";
import { Meta, PaginatedResponse } from "../shared/types";
import { formatPhone } from "../utils";
import { CreateUserDto, UserQuery } from "./dto/user.dto";
import { User } from "./types/user.types";

export class UserService {
  constructor(private fetcher = new Fetcher()) {}

  private getHashedString(str: string) {
    return crypto.createHash("sha512").update(str).digest("hex");
  }

  async create({
    password,
    roleid,
    active,
    modules,
    ...data
  }: CreateUserDto): Promise<void> {
    const hashedPassword = password
      ? this.getHashedString(password)
      : undefined;

    await this.fetcher.request("/", {
      data: {
        operation: "createuser",
        ...data,
        gender:
          data.gender?.charAt(0).toUpperCase() +
          data.gender?.slice(1).toLowerCase(),
        roleid: roleid === "custom" ? undefined : roleid,
        password: hashedPassword,
        active: active ? 1 : 0,
        modules: modules || [],
        stations: [],
        userkey: "",
        idtype: "National ID",
        idnumber: "",
        address: "",
        county: "",
        postalcode: "",
        city: "",
      },
    });
  }

  async findAll({
    page = 1,
    pageSize = 10,
    ...rest
  }: UserQuery): Promise<PaginatedResponse<User>> {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: User[];
      // totalrows: number;
    }>("/", {
      data: { operation: "getusers", page: page - 1, rows: pageSize, ...rest },
    });

    const { data } = res;
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

  async findOne(ukey: string): Promise<User> {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: User[];
    }>("/", { data: { operation: "getusers", userkey: ukey } });

    const user = res.data[0];

    if (!user) throw new Error("User not found");

    return {
      ...user,
      Mobile: formatPhone(user.Mobile),
      RoleID: user.modules && user.modules.length > 0 ? "custom" : user.RoleID,
    };
  }
}
