"use client";

import { useEffect, useState } from "react";

import { Building2, Loader2, UserCheck, UserX, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getMerchantsAction } from "@/lib/merchants/merchant.actions";

import MerchantsTable from "./merchants-table";

interface MerchantStats {
  total: number;
  active: number;
  inactive: number;
}

export default function MerchantsPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Clean Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Merchant Management
              </h1>
              <p className="text-gray-600">
                Manage merchant accounts and access control
              </p>
            </div>
          </div>
        </div>

        {/* Merchant Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Total Merchants Card */}
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Merchants
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    ) : (
                      stats.total.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Merchants Card */}
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Merchants
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    ) : (
                      stats.active.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inactive Merchants Card */}
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <UserX className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Inactive Merchants
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    ) : (
                      stats.inactive.toLocaleString()
                    )}
                  </p>
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
