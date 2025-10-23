"use client";

import Link from "next/link";

import { format } from "date-fns";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Calendar,
  Mail,
  Phone,
  User,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Clean Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {merchant.name}
                  </h1>
                  <p className="text-gray-600">
                    ID: {merchant.merchantid} • Code: {merchant.merchantcode}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href={`/merchants/${merchant.merchantid}/performance`}>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Performance
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        </div>

        {/* Essential Merchant Info */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Merchant Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Contact Person
                  </p>
                  <p className="font-semibold text-gray-900">
                    {merchant.contactperson}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {merchant.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Mobile</p>
                  <p className="font-semibold text-gray-900">
                    {merchant.mobile}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Details */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              System Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Public Key
                    </p>
                    <p className="font-mono text-sm text-gray-900">
                      {merchant.publickey}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Created By
                    </p>
                    <p className="font-semibold text-gray-900">
                      {merchant.createdby}
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
                      {format(new Date(merchant.createdon), "MMM dd, yyyy")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(merchant.createdon), "HH:mm")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="font-semibold text-gray-900">
                      {isActive ? "Active" : "Inactive"}
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
