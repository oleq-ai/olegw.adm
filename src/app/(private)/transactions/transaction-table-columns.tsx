"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Calendar,
  CreditCard,
  Download,
  Eye,
  MoreHorizontal,
  Receipt,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";

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
        <div className="cursor-pointer font-mono text-sm font-semibold text-gray-900 transition-colors hover:text-gray-700">
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

      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <CreditCard className="h-4 w-4" />
          </div>
          <div className="font-bold text-gray-900">{formatted}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "description1",
    header: "Status",
    cell: ({ row }) => {
      const description = row.getValue("description1") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <Receipt className="h-3 w-3" />
          </div>
          <span className="font-medium text-gray-900">{description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "transactiontype",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("transactiontype") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <CreditCard className="h-3 w-3" />
          </div>
          <span className="font-semibold text-gray-900">{type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "merchantcode",
    header: "Merchant",
    cell: ({ row }) => {
      const merchantCode = row.getValue("merchantcode") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
            {merchantCode.slice(0, 2).toUpperCase()}
          </div>
          <div className="font-semibold text-gray-900">{merchantCode}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "msisdn",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("msisdn") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <User className="h-3 w-3" />
          </div>
          <div className="font-mono text-sm text-gray-600">{phone}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdon",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdon"));
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Calendar className="h-3 w-3" />
          </div>
          <div className="text-sm text-gray-600">
            {format(date, "MMM dd, yyyy")}
            <div className="text-xs text-gray-500">{format(date, "HH:mm")}</div>
          </div>
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
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 transition-colors hover:bg-gray-100"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-semibold">
              Transaction Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>View details</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center space-x-2"
              onClick={() =>
                navigator.clipboard.writeText(transaction.transactionid)
              }
            >
              <Download className="h-4 w-4" />
              <span>Copy transaction ID</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {transaction.description1?.toLowerCase().includes("pending") && (
              <DropdownMenuItem className="flex items-center space-x-2 text-yellow-600">
                <XCircle className="h-4 w-4" />
                <span>Cancel transaction</span>
              </DropdownMenuItem>
            )}
            {transaction.description1?.toLowerCase().includes("failed") && (
              <DropdownMenuItem className="flex items-center space-x-2 text-green-600">
                <RefreshCw className="h-4 w-4" />
                <span>Retry transaction</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
