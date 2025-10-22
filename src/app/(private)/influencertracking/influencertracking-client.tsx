"use client";
"use no memo";

import React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Influencer {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  totalClicks: number;
  conversions: number;
  revenue: number;
  status: "Active" | "Inactive" | "Pending";
  joinedDate: string;
}

const dummyInfluencers: Influencer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    referralCode: "SARAH2025",
    totalClicks: 1250,
    conversions: 89,
    revenue: 4450,
    status: "Active",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    referralCode: "MIKE89K",
    totalClicks: 2100,
    conversions: 156,
    revenue: 7800,
    status: "Active",
    joinedDate: "2023-11-22",
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    referralCode: "EMMA250",
    totalClicks: 3200,
    conversions: 245,
    revenue: 12250,
    status: "Active",
    joinedDate: "2024-03-10",
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    email: "alex.r@example.com",
    referralCode: "ALEXR45",
    totalClicks: 890,
    conversions: 34,
    revenue: 1700,
    status: "Pending",
    joinedDate: "2024-08-05",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    referralCode: "LISA15K",
    totalClicks: 450,
    conversions: 67,
    revenue: 3350,
    status: "Active",
    joinedDate: "2024-02-28",
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.kim@example.com",
    referralCode: "DAVID75",
    totalClicks: 1100,
    conversions: 45,
    revenue: 2250,
    status: "Inactive",
    joinedDate: "2023-09-12",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const getConversionRate = (conversions: number, clicks: number) => {
  if (clicks === 0) return 0;
  return ((conversions / clicks) * 100).toFixed(2);
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const getStatusBadgeVariant = (status: Influencer["status"]) => {
  switch (status) {
    case "Active":
      return "default";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "outline";
    default:
      return "secondary";
  }
};

export default function InfluencerTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const columns: ColumnDef<Influencer>[] = [
    {
      accessorKey: "name",
      header: "Influencer",
      cell: ({ row }) => {
        const influencer = row.original;
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {influencer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{influencer.name}</div>
              <div className="text-sm text-gray-500">{influencer.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "referralCode",
      header: "Referral Code",
      cell: ({ row }) => {
        const code = row.getValue("referralCode") as string;
        return (
          <div className="flex items-center space-x-2">
            <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
              {code}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(code)}
              className="h-6 w-6 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "totalClicks",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 hover:bg-transparent"
          >
            Clicks
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const clicks = row.getValue("totalClicks") as number;
        return <div>{clicks.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "conversions",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 hover:bg-transparent"
          >
            Conversions
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const conversions = row.getValue("conversions") as number;
        const clicks = row.original.totalClicks;
        const rate = getConversionRate(conversions, clicks);
        return (
          <div>
            <div className="font-medium">{conversions}</div>
            <div className="text-xs text-gray-500">{rate}% rate</div>
          </div>
        );
      },
    },
    {
      accessorKey: "revenue",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 hover:bg-transparent"
          >
            Revenue
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const revenue = row.getValue("revenue") as number;
        return <div className="font-medium">{formatCurrency(revenue)}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Influencer["status"];
        return <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const influencer = row.original;
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
                onClick={() => copyToClipboard(influencer.referralCode)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy referral code
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => copyToClipboard(influencer.email)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit influencer
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: dummyInfluencers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Influencer Management</h1>
          <p className="text-gray-600">
            Track and manage your influencer partnerships
          </p>
        </div>
        <Button>Add New Influencer</Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Total Influencers</div>
          <div className="text-2xl font-bold">{dummyInfluencers.length}</div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold">
            {formatCurrency(
              dummyInfluencers.reduce((sum, inf) => sum + inf.revenue, 0)
            )}
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Total Clicks</div>
          <div className="text-2xl font-bold">
            {dummyInfluencers
              .reduce((sum, inf) => sum + inf.totalClicks, 0)
              .toLocaleString()}
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Avg Conversion Rate</div>
          <div className="text-2xl font-bold">
            {getConversionRate(
              dummyInfluencers.reduce((sum, inf) => sum + inf.conversions, 0),
              dummyInfluencers.reduce((sum, inf) => sum + inf.totalClicks, 0)
            )}
            %
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          Showing {table.getFilteredRowModel().rows.length} of{" "}
          {dummyInfluencers.length} influencer(s)
        </div>
        <div className="text-xs">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
