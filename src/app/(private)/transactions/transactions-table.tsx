"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { TAGS } from "@/lib/shared/constants";

import { TransactionTableColumns } from "./transaction-table-columns";

export default function TransactionsTable() {
  const router = useRouter();
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
  const filter = searchParams.s ?? "";

  // TODO: Replace with actual API call when you provide the endpoints
  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [TAGS.TRANSACTION, { page, pageSize, filter }],
    queryFn: async () => {
      // Mock data for now - replace with actual API call
      return {
        data: [
          {
            id: "TXN001",
            amount: 1500.0,
            currency: "USD",
            status: "completed",
            type: "payment",
            merchant: "Merchant ABC",
            customer: "customer@example.com",
            createdAt: "2024-01-15T10:30:00Z",
            completedAt: "2024-01-15T10:32:00Z",
          },
          {
            id: "TXN002",
            amount: 750.5,
            currency: "USD",
            status: "pending",
            type: "refund",
            merchant: "Merchant XYZ",
            customer: "customer2@example.com",
            createdAt: "2024-01-15T11:15:00Z",
            completedAt: null,
          },
          {
            id: "TXN003",
            amount: 2000.0,
            currency: "USD",
            status: "failed",
            type: "payment",
            merchant: "Merchant DEF",
            customer: "customer3@example.com",
            createdAt: "2024-01-15T12:00:00Z",
            completedAt: null,
          },
        ],
        meta: {
          pageCount: 1,
          total: 3,
        },
      };
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
