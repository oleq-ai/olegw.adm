import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type QueryPaymentResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

async function queryPaymentRequest(
  payreference: string
): Promise<QueryPaymentResponse> {
  try {
    // Use dynamic import to avoid server-only issues
    const { queryPaymentActions } = await import(
      "@/lib/querypay/querypay.action"
    );

    const result = await queryPaymentActions({ payreference });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return {
      success: true,
      message: result.data?.message || "Payment queried successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to query payment",
    };
  }
}

export function useQueryPayment() {
  return useMutation({
    mutationFn: async (payreference: string) => {
      if (!payreference.trim()) {
        throw new Error("Payment reference is required");
      }

      const result = await queryPaymentRequest(payreference.trim());

      if (!result.success) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: (result) => {
      toast.success(result.message || "Payment queried successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to query payment");
    },
  });
}
