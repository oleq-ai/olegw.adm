"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@/lib/transactions/types/transaction.types";

export const TransactionTableColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionid",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.getValue("transactionid") as string;
      return (
        <div className="cursor-pointer font-medium text-blue-600 hover:text-blue-800">
          {transactionId}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "description1",
    header: "Status",
    cell: ({ row }) => {
      const description = row.getValue("description1") as string;

      const getStatusBadge = (description: string) => {
        if (description.toLowerCase().includes("success")) {
          return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Completed
            </Badge>
          );
        } else if (description.toLowerCase().includes("pending")) {
          return (
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
              Pending
            </Badge>
          );
        } else {
          return (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              Failed
            </Badge>
          );
        }
      };

      return getStatusBadge(description);
    },
  },
  {
    accessorKey: "transactiontype",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("transactiontype") as string;
      return <div className="capitalize text-gray-900">{type}</div>;
    },
  },
  {
    accessorKey: "merchantcode",
    header: "Merchant",
    cell: ({ row }) => {
      return (
        <div className="text-gray-900">{row.getValue("merchantcode")}</div>
      );
    },
  },
  {
    accessorKey: "msisdn",
    header: "Phone",
    cell: ({ row }) => {
      return <div className="text-gray-600">{row.getValue("msisdn")}</div>;
    },
  },
  {
    accessorKey: "createdon",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdon"));
      return (
        <div className="text-gray-600">
          {format(date, "MMM dd, yyyy HH:mm")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(transaction.transactionid)
              }
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            {transaction.status === "pending" && (
              <DropdownMenuItem>Cancel transaction</DropdownMenuItem>
            )}
            {transaction.status === "failed" && (
              <DropdownMenuItem>Retry transaction</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
