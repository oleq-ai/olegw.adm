import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Player } from "@/lib/players/types/user.types";
import { formatAmount, formatNumber } from "@/lib/utils";

export const PlayerTableColumns: ColumnDef<Player>[] = [
  {
    accessorKey: "createdon",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({
      row: {
        original: { createdon },
      },
    }) => (
      <div className="flex flex-col gap-1">
        <span className="">{format(new Date(createdon), "PP")}</span>
        <span className="text-xs text-muted-foreground">
          {format(new Date(createdon), "p")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "msisdn",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({
      row: {
        original: { username, msisdn },
      },
    }) => (
      <div className="flex flex-col gap-1">
        <span className="">{username}</span>
        <span className="text-xs text-muted-foreground">{msisdn}</span>
      </div>
    ),
  },

  {
    accessorKey: "totalwithdrawals",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transactions" />
    ),
    cell: ({
      row: {
        original: { totalwithdrawals, totaldeposits },
      },
    }) => (
      <div className="flex flex-col gap-1">
        <span className="">Deposits: {formatAmount(totaldeposits)}</span>
        <span className="text-xs text-muted-foreground">
          Withdrawals: {formatAmount(totalwithdrawals)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "bets",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bet Count" />
    ),
    cell: ({
      row: {
        original: { bets, won },
      },
    }) => (
      <div className="flex flex-col gap-1">
        <span className="">Placed {formatNumber(bets)}</span>
        <span className="text-xs text-muted-foreground">
          Won: {formatNumber(won)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "bettotal",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bet Amount" />
    ),
    cell: ({
      row: {
        original: { bettotal, betwinnings },
      },
    }) => (
      <div className="flex flex-col gap-1">
        <span className="">{formatAmount(bettotal)}</span>
        <span className="text-xs text-muted-foreground">
          {formatAmount(betwinnings)}
        </span>
      </div>
    ),
  },
];
