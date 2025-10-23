import { notFound } from "next/navigation";

import { getMerchantAction } from "@/lib/merchants/merchant.actions";

import MerchantDetails from "./merchant-details";

interface MerchantPageProps {
  params: Promise<{
    merchantid: string;
  }>;
}

export default async function MerchantPage({ params }: MerchantPageProps) {
  const { merchantid } = await params;

  const res = await getMerchantAction(merchantid);

  if (!res.success) {
    notFound();
  }

  if (!res.data) {
    notFound();
  }

  return <MerchantDetails merchant={res.data} />;
}
