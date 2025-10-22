"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

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

  return (
    <DataTable
      columns={UserTableColumns}
      data={data?.data ?? []}
      error={isError ? error : undefined}
      isFetching={isLoading}
      isRefetching={isRefetching}
      pageCount={data?.meta.pageCount}
      onRowClick={({ UKey }) => router.push(`/users/${UKey}`)}
    />
  );
}
