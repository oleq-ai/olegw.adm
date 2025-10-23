import { Metadata } from "next";
import Link from "next/link";

import { PlusIcon } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession } from "@/lib/session/session";

import CompletedTransactionsTable from "./completed-transactions-table";
import FailedTransactionsTable from "./failed-transactions-table";
import PendingTransactionsTable from "./pending-transactions-table";
import TransactionsTable from "./transactions-table";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function TransactionsPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900">
                Transactions
              </h1>
              <p className="text-gray-600">
                Monitor and manage all transaction activities
              </p>
            </div>
            <div className="hidden md:block">
              <PermissionGate
                session={session}
                permissions={["transactions:view"]}
              >
                <Button asChild>
                  <Link href="/transactions/create">
                    <PlusIcon className="size-4" />
                    New Transaction
                  </Link>
                </Button>
              </PermissionGate>
            </div>
          </div>
        </div>

        {/* Transaction Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                  <svg
                    className="h-5 w-5 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">56</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                  <svg
                    className="h-5 w-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Tabs */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="grid h-auto w-full grid-cols-4 rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-gray-50"
                >
                  All Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-gray-50"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-gray-50"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="failed"
                  className="border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-gray-50"
                >
                  Failed
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              <PermissionGate
                session={session}
                permissions={["transactions:view"]}
              >
                <TransactionsTable />
              </PermissionGate>
            </TabsContent>
            <TabsContent value="completed" className="mt-0">
              <PermissionGate
                session={session}
                permissions={["transactions:view"]}
              >
                <CompletedTransactionsTable />
              </PermissionGate>
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              <PermissionGate
                session={session}
                permissions={["transactions:view"]}
              >
                <PendingTransactionsTable />
              </PermissionGate>
            </TabsContent>
            <TabsContent value="failed" className="mt-0">
              <PermissionGate
                session={session}
                permissions={["transactions:view"]}
              >
                <FailedTransactionsTable />
              </PermissionGate>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
