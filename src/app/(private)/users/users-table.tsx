"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { TAGS } from "@/lib/shared/constants";
import { getUsersActions } from "@/lib/users/user.actions";

import { UserTableColumns } from "./user-table-columns";

export default function UsersTable() {
  const router = useRouter();
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
  const filter = searchParams.s ?? "";

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [TAGS.USER, { page, pageSize, filter }],
    queryFn: async () => {
      const res = await getUsersActions({
        page: Number(page),
        pageSize: Number(pageSize),
        ...(filter && { filter }),
      });
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const users = data?.data || [];

  if (isLoading) {
    return (
      <Card className="rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm">
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
                Error Loading Users
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative">
          <CardContent>
            <DataTable
              columns={UserTableColumns}
              data={users}
              error={isError ? error : undefined}
              isFetching={isLoading}
              isRefetching={isRefetching}
              pageCount={data?.meta.pageCount}
              onRowClick={({ UKey }) => router.push(`/users/${UKey}`)}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
