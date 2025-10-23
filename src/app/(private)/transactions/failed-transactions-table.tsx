"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { TAGS } from "@/lib/shared/constants";
import { getFailedTransactionsAction } from "@/lib/transactions/transaction.actions";

import { TransactionTableColumns } from "./transaction-table-columns";

export default function FailedTransactionsTable() {
  const router = useRouter();
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
  const filter = searchParams.s ?? "";

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [TAGS.TRANSACTION, "failed", { page, pageSize, filter }],
    queryFn: async () => {
      const res = await getFailedTransactionsAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  return (
    <DataTable
      columns={TransactionTableColumns}
      data={data?.data ?? []}
      error={isError ? error : undefined}
      isFetching={isLoading}
      isRefetching={isRefetching}
      pageCount={data?.meta.pageCount}
      onRowClick={({ id }) => router.push(`/transactions/${id}`)}
    />
  );
}
