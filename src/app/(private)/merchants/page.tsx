"use client";

import { useEffect, useState } from "react";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Loader2,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
          const active = merchants.filter((m) => m.Active === "True").length;
          const inactive = merchants.filter((m) => m.Active === "False").length;

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
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Merchant Management
                    </h1>
                    <p className="text-gray-600">
                      Manage merchant accounts, permissions, and access control
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Merchant Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Total Merchants Card */}
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
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
                    <div className="flex items-center text-xs text-blue-600">
                      <Activity className="mr-1 h-3 w-3" />
                      All registered merchants
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  Total
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Active Merchants Card */}
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
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
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      Currently active
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Inactive Merchants Card */}
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
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
                    <div className="flex items-center text-xs text-red-600">
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                      Requires attention
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  Inactive
                </Badge>
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
