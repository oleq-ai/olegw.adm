import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import { getSession } from "@/lib/session/session";
import { getTransactionAction } from "@/lib/transactions/transaction.actions";

import TransactionDetails from "./transaction-details";

export const metadata: Metadata = {
  title: "Transaction Details",
};

type Props = {
  params: Promise<{ transactionid: string }>;
};

export default async function TransactionDetailsPage({ params }: Props) {
  const { transactionid } = await params;
  const session = await getSession();

  const res = await getTransactionAction(transactionid);

  if (!res.success) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Transaction Not Found
              </h1>
              <p className="text-gray-600">
                The transaction you&apos;re looking for could not be found.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="mb-1 text-2xl font-bold text-gray-900">
              Transaction Details
            </h1>
            <p className="text-gray-600">
              View detailed information for transaction {transactionid}
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <PermissionGate session={session} permissions={["transactions:view"]}>
            <TransactionDetails transaction={res.data} />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
