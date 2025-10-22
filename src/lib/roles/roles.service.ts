import { Fetcher } from "../api/api.service";
import { Meta } from "../shared/types";
import { CreateRoleDto, RoleQuery } from "./dto/roles.dto";
import { RoleResponse } from "./types/roles.types";

export class RoleService {
  constructor(private fetcher = new Fetcher()) {}

  public async findAll({ page = 1, pageSize = 10, ...rest }: RoleQuery) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: RoleResponse[];
    }>("/", {
      data: { operation: "getroles", page: page - 1, rows: pageSize, ...rest },
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

  public async getRole(id: string) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: RoleResponse[];
    }>("/", { data: { operation: "getroles", id } });

    return res.data[0];
  }

  public async create(values: CreateRoleDto) {
    await this.fetcher.request<{ status: number; message: string }>("/", {
      data: { operation: "createrole", ...values },
    });
  }
}
