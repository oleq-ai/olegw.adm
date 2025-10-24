"use client";

import { useRouter } from "next/navigation";

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

  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: ["merchants"],
    queryFn: async () => {
      const res = await getMerchantsAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
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
                <div key={i} className="h-16 rounded-lg bg-gray-200"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-xl border border-red-200 bg-red-50/50 shadow-sm">
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
      <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
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
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => router.push("/merchants/create")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Merchant
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={MerchantTableColumns}
            data={data || []}
            error={isError ? error : undefined}
            isFetching={isLoading}
            isRefetching={isRefetching}
            paginate={true}
            pageCount={Math.ceil((data?.length || 0) / 10)}
            onRowClick={({ merchantid }) =>
              router.push(`/merchants/${merchantid}`)
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
