"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Calendar,
  Edit,
  Eye,
  Mail,
  MoreHorizontal,
  Phone,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteMerchantAction } from "@/lib/merchants/merchant.actions";
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
          className="cursor-pointer font-mono text-sm font-semibold text-gray-900 transition-colors hover:text-gray-700"
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
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <User className="h-3 w-3" />
          </div>
          <div className="font-semibold text-gray-900">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "contactperson",
    header: "Contact Person",
    cell: ({ row }) => {
      const contactperson = row.getValue("contactperson") as string;
      return <div className="font-medium text-gray-900">{contactperson}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <Mail className="h-3 w-3" />
          </div>
          <div className="text-sm text-gray-600">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "Phone",
    cell: ({ row }) => {
      const mobile = row.getValue("mobile") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <Phone className="h-3 w-3" />
          </div>
          <div className="font-mono text-sm text-gray-600">
            {mobile || "Not provided"}
          </div>
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
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <Shield className="h-3 w-3" />
          </div>
          <div className="text-sm text-gray-600">{merchantcode}</div>
        </div>
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
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <User className="h-3 w-3" />
          </div>
          <span className="font-semibold text-gray-900">
            {isActiveBool ? "Active" : "Inactive"}
          </span>
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
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
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
      const merchant = row.original;

      const handleDelete = async () => {
        if (confirm("Are you sure you want to deactivate this merchant?")) {
          try {
            const result = await deleteMerchantAction(merchant.merchantid);
            if (result.success) {
              toast.success("Merchant deactivated successfully");
              // Refresh the page or update the data
              window.location.reload();
            } else {
              toast.error(result.error || "Failed to deactivate merchant");
            }
          } catch {
            toast.error("An unexpected error occurred");
          }
        }
      };

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
              Merchant Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>View details</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center space-x-2"
              onClick={() =>
                window.open(`/merchants/${merchant.merchantid}/edit`, "_blank")
              }
            >
              <Edit className="h-4 w-4" />
              <span>Edit merchant</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center space-x-2 text-red-600"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span>Deactivate merchant</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
