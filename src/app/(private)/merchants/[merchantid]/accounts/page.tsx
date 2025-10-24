import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle,
  CreditCard,
  DollarSign,
  Plus,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getMerchantAccountsAction,
  getMerchantAction,
} from "@/lib/merchants/merchant.actions";

interface MerchantAccountsPageProps {
  params: Promise<{ merchantid: string }>;
}

export default async function MerchantAccountsPage({
  params,
}: MerchantAccountsPageProps) {
  const { merchantid } = await params;

  // Get merchant details
  const merchantResult = await getMerchantAction(merchantid);
  if (!merchantResult.success || !merchantResult.data) {
    notFound();
  }

  const merchant = merchantResult.data;

  // Get merchant accounts
  const accountsResult = await getMerchantAccountsAction({
    id: "",
    merchantid,
    bankcode: "",
  });

  if (!accountsResult.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <Card className="rounded-xl border border-red-200 bg-red-50/50 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-900">
                  Error Loading Accounts
                </h3>
                <p className="mt-2 text-red-600">
                  {accountsResult.error || "Failed to load merchant accounts"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!accountsResult.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <Card className="rounded-xl border border-red-200 bg-red-50/50 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-900">
                  Error Loading Accounts
                </h3>
                <p className="mt-2 text-red-600">No accounts data available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const accounts = accountsResult.data || [];

  // Calculate summary stats
  const totalRevenue = accounts.reduce(
    (sum, account) => sum + parseFloat(account.revenue || "0"),
    0
  );
  const totalTransactions = accounts.reduce(
    (sum, account) => sum + parseInt(account.transactioncount || "0"),
    0
  );
  const activeAccounts = accounts.filter(
    (account) => account.active === "True"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Enhanced Header */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Merchant Accounts
                </h1>
                <p className="mt-2 text-gray-600">
                  {merchant.name} ({merchant.merchantcode})
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href={`/merchants/${merchantid}/accounts/create`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Merchant
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="rounded-xl border border-green-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">
                Total Revenue
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                KES {totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Combined revenue</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Total Transactions
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {totalTransactions.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">All transactions</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-purple-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">
                Active Accounts
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <Building2 className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {activeAccounts} of {accounts.length}
              </div>
              <p className="text-xs text-gray-500">Active accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Accounts List */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Bank Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {accounts.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  No Accounts Found
                </h3>
                <p className="text-gray-600">
                  This merchant doesn&apos;t have any bank accounts configured
                  yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {accounts.map((account, index) => (
                  <div
                    key={account.id || index}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 p-6 transition-colors hover:bg-gray-100/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {account.accountname || "Unknown Account"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {account.bankcode || "N/A"} •{" "}
                          {account.accountnumber || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-4 gap-6">
                        <div className="text-center">
                          <p className="mb-1 text-sm font-medium text-green-600">
                            Revenue
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            KES{" "}
                            {parseFloat(
                              account.revenue || "0"
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="mb-1 text-sm font-medium text-blue-600">
                            Transactions
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {account.transactioncount || "0"}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="mb-1 text-sm font-medium text-purple-600">
                            Success Rate
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {parseFloat(account.successrate || "0").toFixed(1)}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="mb-1 text-sm font-medium text-gray-600">
                            Status
                          </p>
                          <div className="flex justify-center">
                            {account.active === "True" ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                <XCircle className="mr-1 h-3 w-3" />
                                Inactive
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
