import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/users/types/user.types";

export const UserTableColumns: ColumnDef<User>[] = [
  {
    header: "User ID",
    accessorKey: "UKey",
    cell: ({ row: { original } }) => (
      <span className="font-mono text-sm font-semibold text-gray-900">
        {original.UKey}
      </span>
    ),
  },
  {
    header: "Name",
    accessorKey: "firstname",
    cell: ({ row: { original } }) => (
      <span className="font-medium text-gray-900">
        {original.Firstname} {original.Middlename} {original.Lastname}
      </span>
    ),
  },
  {
    header: "Username",
    accessorKey: "Username",
    cell: ({ row: { original } }) => (
      <span className="font-semibold text-gray-900">{original.Username}</span>
    ),
  },
  {
    header: "Phone",
    accessorKey: "Mobile",
    cell: ({ row: { original } }) => (
      <span className="text-gray-600">{original.Mobile || "Not provided"}</span>
    ),
  },
  {
    header: "Email",
    accessorKey: "Email",
    cell: ({ row: { original } }) => (
      <span className="text-sm text-gray-600">{original.Email}</span>
    ),
  },
  {
    header: "Location",
    accessorKey: "City",
    cell: ({ row: { original } }) => (
      <span className="text-sm text-gray-600">
        {original.City || "Not specified"}
      </span>
    ),
  },
  {
    header: "Gender",
    accessorKey: "Gender",
    cell: ({ row: { original } }) => (
      <Badge
        className="text-xs uppercase"
        variant={
          original.Gender?.toLowerCase() === "male"
            ? "default"
            : original.Gender?.toLowerCase() === "female"
              ? "secondary"
              : "outline"
        }
      >
        {original.Gender}
      </Badge>
    ),
  },
  {
    header: "Role",
    accessorKey: "RoleName",
    cell: ({ row: { original } }) => (
      <Badge variant="outline" className="font-semibold">
        {original.RoleName}
      </Badge>
    ),
  },
  {
    header: "Status",
    accessorKey: "Active",
    cell: ({ row: { original } }) => {
      const isActive = original.Active === "True";
      return (
        <Badge
          variant="secondary"
          className={`font-semibold ${
            isActive
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-red-100 text-red-700 hover:bg-red-100"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    header: "Created",
    accessorKey: "UtcTime",
    cell: ({ row: { original } }) => (
      <div className="text-sm text-gray-600">
        {format(new Date(original.UtcTime), "MMM dd, yyyy")}
        <div className="text-xs text-gray-500">
          {format(new Date(original.UtcTime), "HH:mm")}
        </div>
      </div>
    ),
  },
];
