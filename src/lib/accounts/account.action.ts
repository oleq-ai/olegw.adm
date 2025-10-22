"use server";

import { getErrorMessage } from "../get-error-message";
import { AccountService } from "./account.service";
import { GetStatementDto } from "./dto/account.dto";

const accountService = new AccountService();

export async function getStatementAction(
  accountcode: string,
  query: GetStatementDto
) {
  try {
    const statement = await accountService.getStatement(accountcode, query);
    return { success: true as const, data: statement };
  } catch (error) {
    return { success: false as const, error: getErrorMessage(error) };
  }
}
