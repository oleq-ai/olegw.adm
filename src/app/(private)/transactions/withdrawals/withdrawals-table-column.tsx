import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { PullPaymentsOut } from "@/lib/reports/types/reports.types";
import { formatAmount } from "@/lib/utils";

import RetryDialogue from "./retry-dialogue";

export const WithdrawalTableColumns: (
  canRetryPayment: boolean
) => ColumnDef<PullPaymentsOut>[] = (canRetryPayment) => [
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
      <DataTableColumnHeader column={column} title="Gross Amount" />
    ),
    accessorKey: "grossamount",
    enableSorting: true,
    cell: ({
      row: {
        original: { grossamount },
      },
    }) => formatAmount(grossamount),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Amount" />
    ),
    accessorKey: "netamount",
    enableSorting: true,
    cell: ({
      row: {
        original: { netamount },
      },
    }) => formatAmount(netamount),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Charges" />
    ),
    accessorKey: "charges",
    enableSorting: true,
    cell: ({
      row: {
        original: { charges },
      },
    }) => formatAmount(charges),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient" />
    ),
    accessorKey: "recipientaccount",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    accessorKey: "status",
    cell: ({
      row: {
        original: { status },
      },
    }) => (
      <Badge
        variant={
          status === "SUCCESSFUL"
            ? "success"
            : status === "PROCESSING"
              ? "error"
              : "warning"
        }
      >
        {status}
      </Badge>
    ),
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    accessorKey: "status",
    id: "actions",
    cell: ({
      cell: {
        row: {
          original: { status, reference },
        },
      },
    }) =>
      status === "PENDING" &&
      canRetryPayment && <RetryDialogue transactionRef={reference} />,
  },
];
