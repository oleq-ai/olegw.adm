"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CheckCircle, Edit, MoreHorizontal, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Merchant } from "@/lib/merchants/types/merchant.types";

export const MerchantTableColumns: ColumnDef<Merchant>[] = [
  {
    accessorKey: "merchantid",
    header: "Merchant ID",
    cell: ({ row }) => {
      const merchantid = row.getValue("merchantid") as string;
      return (
        <Link
          href={`/merchants/${merchantid}`}
          className="cursor-pointer font-mono text-sm font-semibold text-gray-900 transition-colors hover:text-blue-600"
        >
          {merchantid}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Merchant Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="font-semibold text-gray-900">{name}</div>;
    },
  },
  {
    accessorKey: "contactperson",
    header: "Contact Person",
    cell: ({ row }) => {
      const contactperson = row.getValue("contactperson") as string;
      return (
        <div className="text-sm font-semibold text-gray-900">
          {contactperson}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <div className="text-sm font-medium text-gray-900">{email}</div>;
    },
  },
  {
    accessorKey: "mobile",
    header: "Phone",
    cell: ({ row }) => {
      const mobile = row.getValue("mobile") as string;
      return (
        <div className="font-mono text-sm font-medium text-gray-900">
          {mobile || "Not provided"}
        </div>
      );
    },
  },
  {
    accessorKey: "merchantcode",
    header: "Merchant Code",
    cell: ({ row }) => {
      const merchantcode = row.getValue("merchantcode") as string;
      return (
        <div className="text-sm font-medium text-gray-900">{merchantcode}</div>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("active") as string;
      const isActiveBool = isActive === "True";

      return (
        <div className="flex items-center justify-center">
          {isActiveBool ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              <CheckCircle className="mr-1 h-3 w-3" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              <XCircle className="mr-1 h-3 w-3" />
              Inactive
            </span>
          )}
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
        <div className="text-sm font-medium text-gray-900">
          <div className="whitespace-nowrap">
            {format(date, "MMM dd, yyyy")}
          </div>
          <div className="text-xs text-gray-500">{format(date, "HH:mm")}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const merchant = row.original;

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
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-semibold">
              Quick Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/merchants/${merchant.merchantid}/edit`}
                className="flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Merchant</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
