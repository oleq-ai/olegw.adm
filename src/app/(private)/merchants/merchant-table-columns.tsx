"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  Edit,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Shield,
  Trash2,
  User,
  XCircle,
} from "lucide-react";

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
import { Merchant } from "@/lib/merchants/types/merchant.types";

export const MerchantTableColumns: ColumnDef<Merchant>[] = [
  {
    accessorKey: "UKey",
    header: "Merchant ID",
    cell: ({ row }) => {
      const ukey = row.getValue("UKey") as string;
      return (
        <div className="group flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
            {ukey.slice(-2)}
          </div>
          <div className="cursor-pointer font-mono text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800">
            {ukey}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Username",
    header: "Username",
    cell: ({ row }) => {
      const username = row.getValue("Username") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600 text-white">
            <User className="h-3 w-3" />
          </div>
          <div className="font-semibold text-gray-900">{username}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "Firstname",
    header: "Full Name",
    cell: ({ row }) => {
      const firstname = row.getValue("Firstname") as string;
      const middlename = row.original.Middlename;
      const lastname = row.original.Lastname;
      const fullName = [firstname, middlename, lastname]
        .filter(Boolean)
        .join(" ");

      return <div className="font-medium text-gray-900">{fullName}</div>;
    },
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("Email") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <Mail className="h-3 w-3" />
          </div>
          <div className="text-sm text-gray-600">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "Mobile",
    header: "Phone",
    cell: ({ row }) => {
      const mobile = row.getValue("Mobile") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white">
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
    accessorKey: "City",
    header: "Location",
    cell: ({ row }) => {
      const city = row.getValue("City") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
            <MapPin className="h-3 w-3" />
          </div>
          <div className="text-sm text-gray-600">{city}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "RoleName",
    header: "Role",
    cell: ({ row }) => {
      const roleName = row.getValue("RoleName") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <Shield className="h-3 w-3" />
          </div>
          <Badge variant="outline" className="font-semibold">
            {roleName}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "Active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("Active") as string;
      const isActiveBool = isActive === "True";

      return (
        <div className="flex items-center space-x-2">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              isActiveBool ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isActiveBool ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-red-600" />
            )}
          </div>
          <Badge
            variant="secondary"
            className={`font-semibold ${
              isActiveBool
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isActiveBool ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "UtcTime",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("UtcTime"));
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-600 text-white">
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
    cell: () => {
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
            <DropdownMenuItem className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit merchant</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center space-x-2 text-red-600">
              <Trash2 className="h-4 w-4" />
              <span>Delete merchant</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
