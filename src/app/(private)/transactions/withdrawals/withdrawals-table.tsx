"use client";

import { useQuery } from "@tanstack/react-query";
import { endOfToday, format, startOfYesterday } from "date-fns";
import { Download } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import DataTableSelect from "@/components/ui/data-table-select";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { getPaymentOutAction } from "@/lib/reports/reports.actions";
import { PaymentStatusEnum } from "@/lib/reports/types/reports.types";
import { TAGS } from "@/lib/shared/constants";

import { WithdrawalTableColumns } from "./withdrawals-table-column";

type Props = {
  canRetryPayment: boolean;
};

export default function WithdrawalsTable({ canRetryPayment }: Props) {
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();
  const page = searchParams.page ?? "1";
  const pageSize = searchParams.pageSize ?? "10";
  const start = format(searchParams.start ?? startOfYesterday(), "yyyy-MM-dd");
  const end = format(searchParams.end ?? endOfToday(), "yyyy-MM-dd");
  const status = searchParams.status;
  const filter = searchParams.s;

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [TAGS.WITHDRAWALS, { page, pageSize, start, end, status }],
    queryFn: async () => {
      const res = await getPaymentOutAction({
        start,
        end,
        page: Number(page),
        pageSize: Number(pageSize),
        ...(status && { status }),
        ...(filter && { filter }),
      });
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const handleExport = async () => {
    try {
      const res = await getPaymentOutAction({
        start,
        end,
        page: 1,
        pageSize: 100000, // Get all data for  }),
        ...(filter && { filter }),
      });

      if (!res.success) throw new Error(res.error);

      const exportData = res.data.data.map((withdrawal) => ({
        date: format(new Date(withdrawal.date), "yyyy-MM-dd HH:mm:ss"),
        reference: withdrawal.reference,
        grossamount: Number(withdrawal.grossamount).toFixed(2),
        netamount: Number(withdrawal.netamount).toFixed(2),
        charges: Number(withdrawal.charges).toFixed(2),
        recipientaccount: withdrawal.recipientaccount,
        status: withdrawal.status,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Withdrawals");

      const filename = `withdrawals_${start}_to_${end}${status ? `_${status}` : ""}.xlsx`;
      XLSX.writeFile(workbook, filename);

      toast.success("Withdrawals exported successfully!");
    } catch (error) {
      toast.error(
        `Failed to export withdrawals: ${
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
        columns={WithdrawalTableColumns(canRetryPayment)}
        data={data?.data ?? []}
        error={isError ? error : undefined}
        isFetching={isLoading}
        isRefetching={isRefetching}
        pageCount={data?.meta.pageCount}
        filterByDate
        allowSearch
        headerComponent={
          <DataTableSelect
            name="status"
            placeholder="Select status"
            options={Object.entries(PaymentStatusEnum).map(([key, value]) => ({
              label: key,
              value,
            }))}
          />
        }
      />
    </div>
  );
}
