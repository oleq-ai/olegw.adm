"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { TAGS } from "@/lib/shared/constants";
import { getCompletedTransactionsAction } from "@/lib/transactions/transaction.actions";

import TransactionDateFilter from "./transaction-date-filter";
import { TransactionTableColumns } from "./transaction-table-columns";

export default function CompletedTransactionsTable() {
  const router = useRouter();
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
  const filter = searchParams.s ?? "";

  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [
      TAGS.TRANSACTION,
      "completed",
      { page, pageSize, filter, startDate, endDate },
    ],
    queryFn: async () => {
      const res = await getCompletedTransactionsAction(
        startDate,
        endDate,
        parseInt(page),
        parseInt(pageSize)
      );
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const handleDateChange = (start?: string, end?: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Completed Transactions</h3>
        <TransactionDateFilter
          onDateChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <DataTable
        columns={TransactionTableColumns}
        data={data?.data ?? []}
        error={isError ? error : undefined}
        isFetching={isLoading}
        isRefetching={isRefetching}
        pageCount={data?.meta.pageCount}
        onRowClick={({ transactionid }) =>
          router.push(`/transactions/${transactionid}`)
        }
      />
    </div>
  );
}
