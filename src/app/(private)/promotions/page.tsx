import React, { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import BonusTable from "./bonus-table";

export default function BonusManagementPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bonus Management</h1>
        <p className="mt-1 text-gray-600">Manage your bonus configurations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bonus Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-[400px] w-full" />
              </div>
            }
          >
            <BonusTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
