import "server-only";

import { Fetcher } from "../api/api.service";
import { Meta } from "../shared/types";
import { GetStatementDto } from "./dto/account.dto";
import { Statement } from "./types/account.type";

export class AccountService {
  constructor(private fetcher = new Fetcher()) {}

  async getStatement(
    accountcode: string,
    { page, pageSize, ...rest }: GetStatementDto
  ) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: Statement[];
      totalrows: number;
    }>("/", {
      data: {
        operation: "getstatement",
        page: page - 1,
        rows: pageSize,
        accountcode,
        ...rest,
      },
    });

    const { data, totalrows } = res;

    const pageCount = Math.ceil(Number(totalrows) / Number(pageSize));

    const meta: Meta = {
      pageCount,
      currentPage: page,
      itemCount: totalrows,
      pageSize,
    };

    return { data, meta };
  }
}
