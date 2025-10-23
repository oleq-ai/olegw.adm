"use client";

import { useEffect, useState } from "react";

import { Activity, CheckCircle, Clock, Loader2, XCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCompletedTransactionsAction,
  getFailedTransactionsAction,
  getPendingTransactionsAction,
} from "@/lib/transactions/transaction.actions";

import CompletedTransactionsTable from "./completed-transactions-table";
import FailedTransactionsTable from "./failed-transactions-table";
import PendingTransactionsTable from "./pending-transactions-table";

// Note: Metadata is handled by the layout since this is now a client component

interface TransactionStats {
  completed: number;
  pending: number;
  failed: number;
}

export default function TransactionsPage() {
  const [stats, setStats] = useState<TransactionStats>({
    completed: 0,
    pending: 0,
    failed: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    // Fetch transaction counts
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const [completedRes, pendingRes, failedRes] = await Promise.all([
          getCompletedTransactionsAction(undefined, undefined, 1, 1),
          getPendingTransactionsAction(undefined, undefined, 1, 1),
          getFailedTransactionsAction(undefined, undefined, 1, 1),
        ]);

        setStats({
          completed: completedRes.success
            ? completedRes.data.meta.itemCount
            : 0,
          pending: pendingRes.success ? pendingRes.data.meta.itemCount : 0,
          failed: failedRes.success ? failedRes.data.meta.itemCount : 0,
        });
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
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Transaction Center
                    </h1>
                    <p className="text-gray-600">
                      Monitor, manage, and analyze all transaction activities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Transaction Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Completed Transactions Card */}
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Completed
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {isLoadingStats ? (
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                      ) : (
                        stats.completed.toLocaleString()
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Transactions Card */}
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {isLoadingStats ? (
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                      ) : (
                        stats.pending.toLocaleString()
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Failed Transactions Card */}
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Failed</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {isLoadingStats ? (
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                      ) : (
                        stats.failed.toLocaleString()
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Transaction Tabs */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="from-blue-500/3 via-purple-500/3 to-indigo-500/3 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <Tabs defaultValue="completed" className="w-full">
              <div className="border-b border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-gray-100/50">
                <TabsList className="grid h-auto w-full grid-cols-3 rounded-none bg-transparent p-0">
                  <TabsTrigger
                    value="completed"
                    className="group/tab relative border-b-2 border-transparent px-6 py-4 text-sm font-semibold transition-all duration-200 hover:bg-green-50/50 data-[state=active]:border-green-500 data-[state=active]:bg-green-50/80 data-[state=active]:text-green-700"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="group/tab relative border-b-2 border-transparent px-6 py-4 text-sm font-semibold transition-all duration-200 hover:bg-yellow-50/50 data-[state=active]:border-yellow-500 data-[state=active]:bg-yellow-50/80 data-[state=active]:text-yellow-700"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Pending</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="failed"
                    className="group/tab relative border-b-2 border-transparent px-6 py-4 text-sm font-semibold transition-all duration-200 hover:bg-red-50/50 data-[state=active]:border-red-500 data-[state=active]:bg-red-50/80 data-[state=active]:text-red-700"
                  >
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      <span>Failed</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="completed" className="mt-0">
                <CompletedTransactionsTable />
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                <PendingTransactionsTable />
              </TabsContent>
              <TabsContent value="failed" className="mt-0">
                <FailedTransactionsTable />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}
