import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/users/types/user.types";

export const UserTableColumns: ColumnDef<User>[] = [
  {
    header: "Name",
    accessorKey: "firstname",
    cell: ({ row: { original } }) => (
      <span className="">
        {original.Firstname} {original.Middlename} {original.Lastname}
      </span>
    ),
  },
  { header: "Phone", accessorKey: "Mobile" },
  { header: "Email", accessorKey: "Email" },
  {
    header: "Gender",
    accessorKey: "Gender",
    cell: ({ row: { original } }) => (
      <Badge
        className="text-xs uppercase"
        variant={
          original.Gender?.toLowerCase() === "male"
            ? "error"
            : original.Gender?.toLowerCase() === "female"
              ? "warning"
              : "muted"
        }
      >
        {original.Gender}
      </Badge>
    ),
  },
  {
    header: "Role",
    accessorKey: "RoleID",
    cell: ({ row: { original } }) =>
      original.RoleID ? (
        <Badge className="text-center uppercase" variant="muted">
          {original.RoleID}
        </Badge>
      ) : null,
  },
];
