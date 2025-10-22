import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { PullPaymentsIn } from "@/lib/reports/types/reports.types";
import { formatAmount } from "@/lib/utils";

export const DepositTableColumns: ColumnDef<PullPaymentsIn>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    accessorKey: "date",
    enableSorting: true,
    cell: ({
      row: {
        original: { date },
      },
    }) => format(new Date(date), "PPp"),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference" />
    ),
    accessorKey: "reference",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
    accessorKey: "mobile",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    accessorKey: "amount",
    enableSorting: true,
    cell: ({
      row: {
        original: { amount },
      },
    }) => formatAmount(amount),
  },
];
