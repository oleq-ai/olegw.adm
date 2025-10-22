"use client";

import { useQuery } from "@tanstack/react-query";
import { endOfToday, format, startOfYesterday } from "date-fns";
import { Download } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { getPaymentInAction } from "@/lib/reports/reports.actions";
import { TAGS } from "@/lib/shared/constants";

import { DepositTableColumns } from "./deposits-table-column";

export default function DepositsTable() {
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
  const start = format(searchParams.start ?? startOfYesterday(), "yyyy-MM-dd");
  const end = format(searchParams.end ?? endOfToday(), "yyyy-MM-dd");
  const filter = searchParams.s;

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [TAGS.DEPOSITS, { page, pageSize, start, end, filter }],
    queryFn: async () => {
      const res = await getPaymentInAction({
        start,
        end,
        page: Number(page),
        pageSize: Number(pageSize),
        ...(filter && { filter }),
      });
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const handleExport = async () => {
    try {
      const res = await getPaymentInAction({
        start,
        end,
        page: 1,
        pageSize: 100000,
        ...(filter && { filter }),
      });

      if (!res.success) throw new Error(res.error);

      const exportData = res.data.data.map((deposit) => ({
        date: format(new Date(deposit.date), "yyyy-MM-dd HH:mm:ss"),
        reference: deposit.reference,
        mobile: deposit.mobile,
        amount: Number(deposit.amount).toFixed(2),
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Deposits");

      const filename = `deposits_${start}_to_${end}.xlsx`;
      XLSX.writeFile(workbook, filename);

      toast.success("Deposits exported successfully!");
    } catch (error) {
      toast.error(
        `Failed to export deposits: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div></div>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={handleExport}
          disabled={isLoading || !data?.data?.length}
        >
          <Download className="mr-2 h-4 w-4" />
          Export EXCEL
        </Button>
      </div>

      <DataTable
        columns={DepositTableColumns}
        data={data?.data ?? []}
        error={isError ? error : undefined}
        isFetching={isLoading}
        isRefetching={isRefetching}
        pageCount={data?.meta.pageCount}
        filterByDate
        allowSearch
      />
    </div>
  );
}
