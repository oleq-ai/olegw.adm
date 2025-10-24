"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BarChart,
  Building2,
  Loader2,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMerchantsAction } from "@/lib/merchants/merchant.actions";

import MerchantsTable from "./merchants-table";

interface MerchantStats {
  total: number;
  active: number;
  inactive: number;
}

export default function MerchantsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<MerchantStats>({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    // Fetch merchant stats
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const res = await getMerchantsAction();

        if (res.success && res.data) {
          const merchants = res.data;
          const active = merchants.filter((m) => m.active === "True").length;
          const inactive = merchants.filter((m) => m.active === "False").length;

          setStats({
            total: merchants.length,
            active,
            inactive,
          });
        }
      } catch {
        // Handle error silently or show user-friendly message
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Enhanced Header */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Merchant Management
                </h1>
                <p className="mt-2 text-gray-600">
                  Manage merchant accounts and access control
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => router.push("/merchants/performance")}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <BarChart className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </div>
          </div>
        </div>

        {/* Merchant Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Total Merchants Card */}
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm font-medium text-blue-600">
                    Total Merchants
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                    ) : (
                      stats.total.toLocaleString()
                    )}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">All merchants</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Merchants Card */}
          <Card className="rounded-xl border border-green-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm font-medium text-green-600">
                    Active Merchants
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-8 w-8 animate-spin text-green-400" />
                    ) : (
                      stats.active.toLocaleString()
                    )}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Currently active</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inactive Merchants Card */}
          <Card className="rounded-xl border border-red-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm font-medium text-red-600">
                    Inactive Merchants
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-8 w-8 animate-spin text-red-400" />
                    ) : (
                      stats.inactive.toLocaleString()
                    )}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Currently inactive
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <UserX className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Merchants Table */}
        <MerchantsTable />
      </div>
    </div>
  );
}
