"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getMerchantsAction } from "@/lib/merchants/merchant.actions";

import { MerchantTableColumns } from "./merchant-table-columns";

export default function MerchantsTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: ["merchants", searchTerm],
    queryFn: async () => {
      const res = await getMerchantsAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  // Filter merchants based on search term
  const filteredMerchants =
    data?.filter(
      (merchant) =>
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.contactperson
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.merchantcode.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Merchants
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage merchant accounts and permissions
                  </CardDescription>
                </div>
              </div>
              <div className="text-sm text-gray-600">Loading...</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300"
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-2xl border border-red-200 bg-red-50/50 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-900">
                Error Loading Merchants
              </h3>
              <p className="text-red-600">
                {error?.message || "Something went wrong"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Merchants
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage merchant accounts and permissions
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Merchant
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <DataTable
              columns={MerchantTableColumns}
              data={filteredMerchants}
              error={isError ? error : undefined}
              isFetching={isLoading}
              isRefetching={isRefetching}
              onRowClick={({ merchantid }) =>
                router.push(`/merchants/${merchantid}`)
              }
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
