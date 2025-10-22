import { Route } from "next";
import { ReactNode } from "react";

import { XCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";

type Props<T extends string> = {
  message: ReactNode;
  title: string;
  items?: { title: string; href: Route<T> | URL }[];
};

export default function ErrorAlert<T extends string>({
  message,
  title,
  items,
}: Props<T>) {
  return (
    <div className="space-y-4">
      <BreadcrumbNav title={title} items={items} />

      <div className="space-y-8 rounded-lg border border-dashed p-2 shadow-sm md:p-8">
        <div className="w-full space-y-6">
          <div className="mx-auto max-w-screen-lg">
            <Alert variant="destructive" className="mb-4">
              <XCircle className="size-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
