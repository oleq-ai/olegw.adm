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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Clean Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Activity className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            </div>
          </div>
        </div>

        {/* Transaction Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Completed Transactions Card */}
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <CheckCircle className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    ) : (
                      stats.completed.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Transactions Card */}
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    ) : (
                      stats.pending.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Failed Transactions Card */}
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <XCircle className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Failed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoadingStats ? (
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    ) : (
                      stats.failed.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Tabs */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <Tabs defaultValue="completed" className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="completed"
                  className="border-b-2 border-transparent px-6 py-4 text-sm font-semibold data-[state=active]:border-gray-600 data-[state=active]:text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="border-b-2 border-transparent px-6 py-4 text-sm font-semibold data-[state=active]:border-gray-600 data-[state=active]:text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Pending</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="failed"
                  className="border-b-2 border-transparent px-6 py-4 text-sm font-semibold data-[state=active]:border-gray-600 data-[state=active]:text-gray-900"
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
        </Card>
      </div>
    </div>
  );
}
