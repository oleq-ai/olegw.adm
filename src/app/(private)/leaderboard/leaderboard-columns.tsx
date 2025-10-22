"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { LeaderboardEntry } from "@/lib/accounts/leaderboard/leaderboard.types";

export const LeaderboardTableColumns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Badge
          variant={row.index < 3 ? "default" : "secondary"}
          className={`min-w-[60px] justify-center ${
            row.index === 0
              ? "bg-yellow-500 text-yellow-900"
              : row.index === 1
                ? "bg-gray-400 text-gray-900"
                : row.index === 2
                  ? "bg-amber-600 text-amber-900"
                  : ""
          }`}
        >
          #{row.index + 1}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "bet",
    header: "Total Bet",
    cell: ({ row }) => (
      <div className="font-mono">{Number(row.getValue("bet")).toFixed(2)}</div>
    ),
  },
  {
    accessorKey: "won",
    header: "Total Won",
    cell: ({ row }) => (
      <div className="font-mono font-semibold text-green-600">
        {Number(row.getValue("won")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "ratio",
    header: "Win Ratio",
    cell: ({ row }) => {
      const bet = Number(row.getValue("bet"));
      const won = Number(row.getValue("won"));
      const ratio = bet > 0 ? won / bet : 0;

      return (
        <div
          className={`font-mono ${ratio > 1 ? "text-green-600" : "text-red-600"}`}
        >
          {(ratio * 100).toFixed(1)}%
        </div>
      );
    },
  },
];
