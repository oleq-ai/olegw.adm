"use client";

import Link from "next/link";

import { format } from "date-fns";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  Edit,
  Hash,
  Key,
  Mail,
  Phone,
  Shield,
  User,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MerchantDetails } from "@/lib/merchants/types/merchant.types";

interface MerchantDetailsProps {
  merchant: MerchantDetails;
}

export default function MerchantDetails({ merchant }: MerchantDetailsProps) {
  const isActive = merchant.active === "True";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Enhanced Header */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {merchant.name}
                </h1>
                <p className="mt-2 text-gray-600">
                  Merchant Details & Information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href={`/merchants/${merchant.merchantid}/edit`}>
                <Button
                  variant="outline"
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Merchant
                </Button>
              </Link>
              <Link href={`/merchants/${merchant.merchantid}/performance`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Performance
                </Button>
              </Link>
              <Link href={`/merchants/${merchant.merchantid}/accounts`}>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  View Accounts
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        </div>

        {/* Merchant Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Merchant ID
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <Hash className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-lg font-bold text-gray-900">
                {merchant.merchantid}
              </div>
              <p className="text-xs text-gray-500">Unique identifier</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-green-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">
                Merchant Code
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <Building2 className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-lg font-bold text-gray-900">
                {merchant.merchantcode}
              </div>
              <p className="text-xs text-gray-500">Business code</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-purple-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">
                Account Status
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {isActive ? (
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
              <p className="mt-1 text-xs text-gray-500">Current status</p>
            </CardContent>
          </Card>
        </div>

        {/* Essential Merchant Info */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <User className="h-5 w-5 text-blue-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex items-start space-x-4 rounded-lg border border-green-200 bg-green-50/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-green-600">
                    Contact Person
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {merchant.contactperson}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rounded-lg border border-purple-200 bg-purple-50/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-purple-600">
                    Email Address
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {merchant.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rounded-lg border border-orange-200 bg-orange-50/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-orange-600">
                    Mobile Number
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {merchant.mobile}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Details */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Key className="h-5 w-5 text-blue-600" />
              System Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Key className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-medium text-blue-600">
                      Public Key
                    </p>
                    <p className="break-all font-mono text-sm text-gray-900">
                      {merchant.publickey}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rounded-lg border border-green-200 bg-green-50/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-medium text-green-600">
                      Created By
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {merchant.createdby}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 rounded-lg border border-purple-200 bg-purple-50/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-medium text-purple-600">
                      Created On
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {format(new Date(merchant.createdon), "MMM dd, yyyy")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(merchant.createdon), "HH:mm")}
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
