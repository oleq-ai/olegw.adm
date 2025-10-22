"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import DataTableSelect from "@/components/ui/data-table-select";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { getPlayersActions } from "@/lib/players/players.actions";
import { Player } from "@/lib/players/types/user.types";
import { TAGS } from "@/lib/shared/constants";

import { PlayerTableColumns } from "./player-table-columns";

export default function PlayersTable() {
  const router = useRouter();
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
  const filter = searchParams.s;
  const orderby = searchParams.orderby;
  const start = searchParams.start ?? "2024-01-01";
  const end = searchParams.end ?? format(new Date(), "yyyy-MM-dd");
  // const start = searchParams.start ?? format(startOfMonth(new Date()), "yyyy-MM-dd");
  // const end = searchParams.end ?? format(new Date(), "yyyy-MM-dd");

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [TAGS.PLAYERS, { page, pageSize, filter, orderby, start, end }],
    queryFn: async () => {
      const res = await getPlayersActions({
        page: Number(page),
        pageSize: Number(pageSize),
        ...(filter && { filter }),
        ...(orderby && { orderby }),
        ...(start && { startdate: start }),
        ...(end && { enddate: end }),
      });
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const handleExport = async () => {
    try {
      const res = await getPlayersActions({
        page: 1,
        pageSize: 100000,
        ...(filter && { filter }),
        ...(orderby && { orderby }),
        ...(start && { startdate: start }),
        ...(end && { enddate: end }),
      });

      if (!res.success) throw new Error(res.error);

      const exportData = res.data.data.map(
        ({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          publickey,
          createdon,
          totaldeposits,
          totalwithdrawals,
          bettotal,
          betwinnings,
          ...rest
        }: Player) => ({
          ...rest,
          totaldeposits: Number(totaldeposits).toFixed(2),
          totalwithdrawals: Number(totalwithdrawals).toFixed(2),
          bettotal: Number(bettotal).toFixed(2),
          betwinnings: Number(betwinnings).toFixed(2),
          createdon: format(new Date(createdon), "yyyy-MM-dd HH:mm:ss"),
        })
      );

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Players");

      XLSX.writeFile(workbook, "players_export.xlsx");
    } catch (error) {
      toast.error(
        `Failed to complete action: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div></div>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={handleExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Export EXCEL
        </Button>
      </div>
      <DataTable
        columns={PlayerTableColumns}
        data={data?.data ?? []}
        error={isError ? error : undefined}
        isFetching={isLoading}
        isRefetching={isRefetching}
        pageCount={data?.meta.pageCount}
        allowSearch
        filterByDate
        showViewOptions={true}
        onRowClick={({ publickey }) => router.push(`/players/${publickey}`)}
        headerComponent={
          <>
            <DataTableSelect
              name="orderby"
              placeholder="Sort By Join Date"
              options={[
                { label: "Ascending", value: "createdon:asc" },
                { label: "Descending", value: "createdon:desc" },
              ]}
            />
          </>
        }
      />
    </div>
  );
}
