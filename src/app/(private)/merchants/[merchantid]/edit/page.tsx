import { notFound } from "next/navigation";

import { getMerchantAction } from "@/lib/merchants/merchant.actions";

import EditMerchantForm from "./edit-merchant-form";

interface EditMerchantPageProps {
  params: Promise<{ merchantid: string }>;
}

export default async function EditMerchantPage({
  params,
}: EditMerchantPageProps) {
  const { merchantid } = await params;

  const merchantResult = await getMerchantAction(merchantid);

  if (!merchantResult.success || !merchantResult.data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <EditMerchantForm merchant={merchantResult.data} />
      </div>
    </div>
  );
}
