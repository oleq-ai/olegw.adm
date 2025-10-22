"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BonusConfigResponse } from "@/lib/players/types/user.types";

interface BonusTableColumnsProps {
  onEdit: (bonus: BonusConfigResponse) => void;
}

export const createBonusTableColumns = ({
  onEdit,
}: BonusTableColumnsProps): ColumnDef<BonusConfigResponse>[] => [
  {
    accessorKey: "bonusref",
    header: "Reference",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("bonusref")}</div>
    ),
  },
  {
    accessorKey: "bonusname",
    header: "Bonus Details",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">{row.getValue("bonusname")}</span>
        <span className="max-w-xs truncate text-xs text-muted-foreground">
          {row.original.description}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "bonustype",
    header: "Type & Mode",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-800">
          {row.getValue("bonustype")}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {row.original.bonusmode === "FLATFEE" ? "Flat Fee" : "Percentage"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">{row.getValue("condition")}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {parseFloat(row.original.conditionval).toFixed(2)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "bonus",
    header: "Bonus Amount",
    cell: ({ row }) => (
      <div className="font-mono font-semibold text-green-600">
        {parseFloat(row.getValue("bonus")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "startdate",
    header: "Schedule",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="text-sm">
          {row.original.startdate} - {row.original.enddate}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {row.original.starttime} - {row.original.endtime}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "repeat",
    header: "Frequency",
    cell: ({ row }) => (
      <Badge variant="outline" className="w-fit text-xs">
        {row.getValue("repeat")}
      </Badge>
    ),
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("active") === "True";
      return (
        <Badge
          variant={isActive ? "default" : "destructive"}
          className={
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdon",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdon"));
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">{format(date, "MMM dd, yyyy")}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {row.original.createdby}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(row.original)}
          title="Edit Bonus"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
