"use client";

import { format } from "date-fns";
import {
  Building2,
  Calendar,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MerchantDetails } from "@/lib/merchants/types/merchant.types";

interface MerchantDetailsProps {
  merchant: MerchantDetails;
}

export default function MerchantDetails({ merchant }: MerchantDetailsProps) {
  const isActive = merchant.active === "True";

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
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {merchant.name}
                    </h1>
                    <p className="text-gray-600">
                      Merchant ID: {merchant.merchantid} • Code:{" "}
                      {merchant.merchantcode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant="secondary"
                  className={`font-semibold ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Merchant Information Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Basic Information */}
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Basic Information
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Merchant contact and identification details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-600 text-white">
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Mobile</p>
                    <p className="font-semibold text-gray-900">
                      {merchant.mobile}
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* System Information */}
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      System Information
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Merchant system details and status
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    <Shield className="h-4 w-4" />
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
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-gradient-to-br from-green-500 to-emerald-600"
                        : "bg-gradient-to-br from-red-500 to-rose-600"
                    } text-white`}
                  >
                    {isActive ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p
                      className={`font-semibold ${
                        isActive ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 text-white">
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
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Additional Details
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Additional merchant information and metadata
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Merchant ID
                    </p>
                    <p className="font-semibold text-gray-900">
                      {merchant.merchantid}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-600 text-white">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Merchant Code
                    </p>
                    <p className="font-semibold text-gray-900">
                      {merchant.merchantcode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
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
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Full Creation Date
                    </p>
                    <p className="font-semibold text-gray-900">
                      {format(
                        new Date(merchant.createdon),
                        "EEEE, MMMM dd, yyyy"
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(merchant.createdon), "HH:mm:ss")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
