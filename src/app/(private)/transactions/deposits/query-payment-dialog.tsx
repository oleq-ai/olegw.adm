"use client";

import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryPaymentActions } from "@/lib/querypay/querypay.action";

export default function QueryPaymentButton() {
  const [payReference, setPayReference] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: queryPayment, isPending } = useMutation({
    mutationFn: async (values: { payreference: string }) => {
      const res = await queryPaymentActions(values);

      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Payment queried successfully");
      setIsOpen(false);
      setPayReference("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to query payment");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payReference.trim()) {
      toast.error("Payment reference is required");
      return;
    }
    queryPayment({ payreference: payReference.trim() });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8">
          <Search className="mr-2 h-4 w-4" />
          Query Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Query Payment Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payreference">Payment Reference</Label>
            <Input
              id="payreference"
              placeholder="Enter payment reference (e.g., THQ5YG7FJJ)"
              value={payReference}
              onChange={(e) => setPayReference(e.target.value)}
              disabled={isPending}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !payReference.trim()}>
              {isPending ? "Querying..." : "Query Payment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
