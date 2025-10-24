"use client";

import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Hash,
  Phone,
  Receipt,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/transactions/types/transaction.types";

interface TransactionDetailsProps {
  transaction: Transaction;
}

export default function TransactionDetails({
  transaction,
}: TransactionDetailsProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Clean Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Receipt className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Transaction Details
                  </h1>
                  <p className="text-gray-600">
                    ID: {transaction.transactionid}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        </div>

        {/* Essential Transaction Info */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Transaction Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Amount</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatAmount(transaction.amount)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900">
                    {transaction.transactiontype}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Hash className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Method</p>
                  <p className="font-semibold text-gray-900">
                    {transaction.transactionmethod}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Essential Details */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Transaction Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Hash className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Reference
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.reference}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Bank Code
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.bankcode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Narration
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.narration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Hash className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Short Code
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.shortcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information - Only if available */}
        {(transaction.msisdn ||
          transaction.firstname ||
          transaction.lastname ||
          transaction.account) && (
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  {transaction.msisdn && (
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Phone Number
                        </p>
                        <p className="font-semibold text-gray-900">
                          {transaction.msisdn}
                        </p>
                      </div>
                    </div>
                  )}
                  {transaction.firstname && (
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          First Name
                        </p>
                        <p className="font-semibold text-gray-900">
                          {transaction.firstname}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {transaction.lastname && (
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Last Name
                        </p>
                        <p className="font-semibold text-gray-900">
                          {transaction.lastname}
                        </p>
                      </div>
                    </div>
                  )}
                  {transaction.account && (
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Account
                        </p>
                        <p className="font-semibold text-gray-900">
                          {transaction.account}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction Timeline */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Transaction Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Transaction Date
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.transactiondate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Transaction Time
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.transactiontime}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Created On
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(transaction.createdon)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Information - Only essential */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Status Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Status Description
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.description1}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Hash className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Response Code
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.response1}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      IPN Sent
                    </p>
                    <p className="font-semibold text-gray-900">
                      {transaction.ipnsent}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
