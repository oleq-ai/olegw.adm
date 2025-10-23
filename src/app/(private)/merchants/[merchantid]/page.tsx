import { notFound } from "next/navigation";

import { getMerchantAction } from "@/lib/merchants/merchant.actions";

import MerchantDetails from "./merchant-details";

interface MerchantPageProps {
  params: {
    merchantid: string;
  };
}

export default async function MerchantPage({ params }: MerchantPageProps) {
  const { merchantid } = params;

  const res = await getMerchantAction(merchantid);

  if (!res.success || !res.data) {
    notFound();
  }

  return <MerchantDetails merchant={res.data} />;
}
