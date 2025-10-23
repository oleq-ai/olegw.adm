"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, CheckCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Completed Transactions
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Successfully processed transactions
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                Loading...
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300"
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-2xl border border-red-200 bg-red-50/50 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-900">
                Error Loading Transactions
              </h3>
              <p className="text-red-600">
                {error?.message || "Something went wrong"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Completed Transactions
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Successfully processed transactions
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TransactionDateFilter
                  onDateChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
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
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
