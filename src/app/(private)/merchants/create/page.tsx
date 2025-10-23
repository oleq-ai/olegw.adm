import { Building2, Plus } from "lucide-react";

import CreateMerchantForm from "./create-merchant-form";

export default function CreateMerchantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Clean Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Create New Merchant
                </h1>
                <p className="text-gray-600">
                  Add a new merchant to the system
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Plus className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <CreateMerchantForm />
      </div>
    </div>
  );
}
