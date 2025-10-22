import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Statement } from "@/lib/accounts/types/account.type";
import { formatAmount } from "@/lib/utils";

export const StatementTableColumns: ColumnDef<Statement>[] = [
  {
    header: "Joined",
    accessorKey: "date",
    cell: ({
      row: {
        original: { date },
      },
    }) => (
      <div className="flex flex-col gap-1">
        <span className="">{format(new Date(date), "PP")}</span>
        <span className="text-xs text-muted-foreground">
          {format(new Date(date), "HH:mm")}
        </span>
      </div>
    ),
  },
  {
    header: "Reference",
    accessorKey: "reference",
    cell: ({
      row: {
        original: { reference, transactiontype },
      },
    }) => (
      <div className="flex flex-col gap-1">
        <span className="">{reference}</span>
        <span className="">
          <Badge
            className="text-xs"
            variant={
              transactiontype === "BETWIN"
                ? "success"
                : transactiontype === "BETWITHDRAW"
                  ? "warning"
                  : transactiontype === "WITHDRAWAL"
                    ? "error"
                    : transactiontype === "PAYMENT"
                      ? "success"
                      : "muted"
            }
          >
            {transactiontype.includes("BET")
              ? `${transactiontype.split("BET")[1]} (BET)`
              : transactiontype}
          </Badge>
        </span>
      </div>
    ),
  },
  { header: "Narration", accessorKey: "narration" },
  {
    header: "Debit",
    accessorKey: "debit",
    cell: ({ row: { original } }) => (
      <span className="font-semibold text-red-500">
        {formatAmount(original.debit)}
      </span>
    ),
  },
  {
    header: "Credit",
    accessorKey: "credit",
    cell: ({ row: { original } }) => (
      <span className="font-semibold text-green-500">
        {formatAmount(original.credit)}
      </span>
    ),
  },
  {
    header: "Balance",
    accessorKey: "balance",
    cell: ({ row: { original } }) => (
      <span className="font-bold">{formatAmount(original.balance)}</span>
    ),
  },
];
