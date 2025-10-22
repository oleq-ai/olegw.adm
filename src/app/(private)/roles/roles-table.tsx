"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { ADMIN_ROLES } from "@/lib/roles/dto/roles.dto";
import { getRolesAction } from "@/lib/roles/role.actions";
import { TAGS } from "@/lib/shared/constants";

import { RoleTableColumns } from "./role-table-columns";

export default function RolesTable() {
  const router = useRouter();
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
  const filter = searchParams.s ?? "";

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [TAGS.ROLE, { page, pageSize, filter }],
    queryFn: async () => {
      const res = await getRolesAction({
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
      columns={RoleTableColumns}
      data={data?.data ?? []}
      pageCount={data?.meta.pageCount}
      error={isError ? error : undefined}
      isFetching={isLoading}
      isRefetching={isRefetching}
      onRowClick={({ roleid, rolename }) =>
        ADMIN_ROLES.includes(rolename.toLowerCase())
          ? undefined
          : router.push(`/roles/${roleid}`)
      }
    />
  );
}
