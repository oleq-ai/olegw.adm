import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Building2,
  CreditCard,
  Plus,
  TrendingUp,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Merchant Accounts
                </h1>
                <p className="text-gray-600">
                  {merchant.name} ({merchant.merchantcode})
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href={`/merchants/${merchantid}/accounts/create`}>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Merchant
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Revenue
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                KES {totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                {accounts.length} account{accounts.length !== 1 ? "s" : ""}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <CreditCard className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Transactions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {totalTransactions.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Building2 className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Accounts
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {activeAccounts} of {accounts.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts List */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Bank Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {accounts.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <CreditCard className="h-8 w-8 text-gray-400" />
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
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {account.accountname || "Unknown Account"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {account.bankcode || "N/A"} •{" "}
                          {account.accountnumber || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Revenue
                          </p>
                          <p className="font-bold text-gray-900">
                            KES{" "}
                            {parseFloat(
                              account.revenue || "0"
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Transactions
                          </p>
                          <p className="font-bold text-gray-900">
                            {account.transactioncount || "0"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Success Rate
                          </p>
                          <p className="font-bold text-gray-900">
                            {parseFloat(account.successrate || "0").toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Status
                          </p>
                          <p
                            className={`font-bold ${account.active === "True" ? "text-green-600" : "text-red-600"}`}
                          >
                            {account.active === "True" ? "Active" : "Inactive"}
                          </p>
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
