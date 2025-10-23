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
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-gray-900">{row.getValue("id")}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const currency = row.original.currency;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const getStatusBadge = (status: string) => {
        switch (status) {
          case "completed":
            return (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Completed
              </Badge>
            );
          case "pending":
            return (
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                Pending
              </Badge>
            );
          case "failed":
            return (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                Failed
              </Badge>
            );
          default:
            return <Badge variant="secondary">{status}</Badge>;
        }
      };

      return getStatusBadge(status);
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return <div className="capitalize text-gray-900">{type}</div>;
    },
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => {
      return <div className="text-gray-900">{row.getValue("merchant")}</div>;
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return <div className="text-gray-600">{row.getValue("customer")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
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
              onClick={() => navigator.clipboard.writeText(transaction.id)}
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
