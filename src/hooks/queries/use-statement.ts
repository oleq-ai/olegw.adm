import { QueryKey, useQuery } from "@tanstack/react-query";
import { format, startOfMonth } from "date-fns";

import { getStatementAction } from "@/lib/accounts/account.action";
import { TAGS } from "@/lib/shared/constants";

import useUpdateSearchParams from "../use-update-search-params";

const queryKey: QueryKey = [TAGS.STATEMENTS];

export function useStatement(accountcode: string) {
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = Number(searchParams.page ?? "1");
  const pageSize = Number(searchParams.pageSize ?? "10");
  const start = format(
    searchParams.start
      ? new Date(searchParams.start)
      : startOfMonth(new Date()),
    "yyyy-MM-dd"
  );
  const end = format(
    searchParams.end ? new Date(searchParams.end) : new Date(),
    "yyyy-MM-dd"
  );

  const transactiontype = searchParams.transactiontype;

  return useQuery({
    queryFn: async () => {
      if (!accountcode) throw new Error("Account code is required");
      const res = await getStatementAction(accountcode, {
        page,
        pageSize,
        start,
        end,
        ...(transactiontype && { transactiontype }),
      });
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    queryKey: [
      ...queryKey,
      { accountcode, page, pageSize, start, end, transactiontype },
    ],
  });
}
