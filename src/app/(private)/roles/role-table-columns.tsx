import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { ADMIN_ROLES } from "@/lib/roles/dto/roles.dto";
import { RoleResponse } from "@/lib/roles/types/roles.types";

export const RoleTableColumns: ColumnDef<RoleResponse>[] = [
  {
    header: "Name",
    accessorKey: "rolename",
    cell: ({ row: { original } }) => (
      <Badge
        variant={
          ADMIN_ROLES.includes(original.rolename.toLowerCase())
            ? "error"
            : "muted"
        }
        className="text-xs text-primary"
      >
        {original.rolename}
      </Badge>
    ),
  },
  { header: "Description", accessorKey: "description" },
  {
    header: "Module Count",
    accessorKey: "modules",
    cell: ({ row: { original } }) =>
      original.modules.length > 0 ? original.modules.length : null,
  },
  {
    header: "Created On",
    accessorKey: "createdon",
    cell: ({ row: { original } }) =>
      original.createdon ? format(new Date(original.createdon), "PPp") : null,
  },
];
