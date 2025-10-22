"use client";

import { format } from "date-fns";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import DataTableSelect from "@/components/ui/data-table-select";
import { useStatement } from "@/hooks/queries/use-statement";
import { transactionTypeOptions } from "@/lib/accounts/constants/constants.type";
import { Statement } from "@/lib/accounts/types/account.type";
import { formatAmount } from "@/lib/utils";

import { StatementTableColumns } from "./statement-table-columns";

type Props = {
  accountcode: string;
};

export default function StatementTable({ accountcode }: Props) {
  const { data, error, isError, isLoading, isRefetching } =
    useStatement(accountcode);

  const exportToExcel = () => {
    if (!data?.data || data.data.length === 0) {
      return;
    }

    const excelData = data.data.map((item: Statement) => ({
      Date: format(new Date(item.date), "PPP"),
      Time: format(new Date(item.date), "HH:mm"),
      Reference: item.reference,
      "Transaction Type": item.transactiontype.includes("BET")
        ? `${item.transactiontype.split("BET")[1]} (BET)`
        : item.transactiontype,
      Narration: item.narration,
      Debit: item.debit ? formatAmount(item.debit).replace(/[^\d.-]/g, "") : "",
      Credit: item.credit
        ? formatAmount(item.credit).replace(/[^\d.-]/g, "")
        : "",
      Balance: formatAmount(item.balance).replace(/[^\d.-]/g, ""),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const columnWidths = [
      { wch: 15 },
      { wch: 8 },
      { wch: 20 },
      { wch: 18 },
      { wch: 30 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Statement");

    const fileName = `statement_${accountcode}_${format(new Date(), "yyyy-MM-dd")}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={exportToExcel}
          variant="outline"
          size="sm"
          disabled={!data?.data || data.data.length === 0 || isLoading}
          className="gap-2"
        >
          <Download size={16} />
          Export to Excel
        </Button>
      </div>
      <DataTable
        columns={StatementTableColumns}
        data={data?.data ?? []}
        error={isError ? error : undefined}
        isFetching={isLoading}
        isRefetching={isRefetching}
        pageCount={data?.meta.pageCount}
        filterByDate
        headerComponent={
          <>
            <DataTableSelect
              name="transactiontype"
              placeholder="Select Transaction Type"
              options={transactionTypeOptions}
            />
          </>
        }
      />
    </>
  );
}
