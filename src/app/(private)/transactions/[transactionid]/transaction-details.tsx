"use client";

import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Transaction } from "@/lib/transactions/types/transaction.types";

interface TransactionDetailsProps {
  transaction: Transaction;
}

export default function TransactionDetails({
  transaction,
}: TransactionDetailsProps) {
  const getStatusBadge = (description: string) => {
    if (description.toLowerCase().includes("success")) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      );
    } else if (description.toLowerCase().includes("pending")) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
    }
  };

  const formatAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    }).format(numAmount);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM dd, yyyy 'at' HH:mm");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Transaction Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Transaction Overview</CardTitle>
                <CardDescription>
                  Transaction ID: {transaction.transactionid}
                </CardDescription>
              </div>
              {getStatusBadge(transaction.description1)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Amount
                </label>
                <p className="text-2xl font-bold text-gray-900">
                  {formatAmount(transaction.amount)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Type
                </label>
                <p className="text-lg font-semibold capitalize text-gray-900">
                  {transaction.transactiontype}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Complete transaction information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Merchant Code
                  </label>
                  <p className="text-gray-900">{transaction.merchantcode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Bank Code
                  </label>
                  <p className="text-gray-900">{transaction.bankcode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Short Code
                  </label>
                  <p className="text-gray-900">{transaction.shortcode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Transaction Method
                  </label>
                  <p className="text-gray-900">
                    {transaction.transactionmethod}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Reference
                  </label>
                  <p className="text-gray-900">{transaction.reference}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Reference 1
                  </label>
                  <p className="text-gray-900">{transaction.reference1}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Negotiated Reference
                  </label>
                  <p className="text-gray-900">
                    {transaction.negotiatedreference}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Checkout Request ID
                  </label>
                  <p className="text-gray-900">
                    {transaction.checkoutrequestid}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Customer and account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  <p className="text-gray-900">{transaction.msisdn}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    First Name
                  </label>
                  <p className="text-gray-900">
                    {transaction.firstname || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Last Name
                  </label>
                  <p className="text-gray-900">
                    {transaction.lastname || "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Account
                  </label>
                  <p className="text-gray-900">{transaction.account}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Account Balance
                  </label>
                  <p className="text-gray-900">
                    {formatAmount(transaction.accbalance)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Transaction Cost
                  </label>
                  <p className="text-gray-900">
                    {transaction.transactioncost || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Timeline</CardTitle>
            <CardDescription>Transaction dates and timestamps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Transaction Date
                  </label>
                  <p className="text-gray-900">{transaction.transactiondate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Transaction Time
                  </label>
                  <p className="text-gray-900">{transaction.transactiontime}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Created On
                  </label>
                  <p className="text-gray-900">
                    {formatDate(transaction.createdon)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Created By
                  </label>
                  <p className="text-gray-900">{transaction.createdby}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Information */}
        <Card>
          <CardHeader>
            <CardTitle>Response Information</CardTitle>
            <CardDescription>API responses and descriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Response 1
                  </label>
                  <p className="text-gray-900">{transaction.response1}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Description 1
                  </label>
                  <p className="text-gray-900">{transaction.description1}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Response 2
                  </label>
                  <p className="text-gray-900">
                    {transaction.response2 || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Description 2
                  </label>
                  <p className="text-gray-900">
                    {transaction.description2 || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium text-gray-500">
                Narration
              </label>
              <p className="text-gray-900">{transaction.narration}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                IPN Sent
              </label>
              <p className="text-gray-900">{transaction.ipnsent}</p>
            </div>
            {transaction.callbackurl && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Callback URL
                </label>
                <p className="break-all text-gray-900">
                  {transaction.callbackurl}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
