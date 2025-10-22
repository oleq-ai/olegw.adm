"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormButton from "@/components/ui/form-button";
import FormDateTimePicker from "@/components/ui/form-date-time-picker";
import FormInput from "@/components/ui/form-input";
import FormPhoneInput from "@/components/ui/form-phone-input";
import FormSelect from "@/components/ui/form-select";
import { DepositDto, depositDto } from "@/lib/players/dto/player.dto";
import { depositFundsAction } from "@/lib/players/players.actions";
import { PaymentMode } from "@/lib/players/types/user.types";
import { TAGS } from "@/lib/shared/constants";

type Props = {
  username: string;
  privatekey: string;
  publickey: string;
};

export default function DepositDialogue({
  username,
  privatekey,
  publickey,
}: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<DepositDto>({
    resolver: zodResolver(depositDto),
    defaultValues: { privatekey },
  });

  const { control, handleSubmit, reset } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: DepositDto) => {
      const res = await depositFundsAction(values);
      if (!res.success) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TAGS.PLAYERS, { publickey }],
      });
      reset();
      toast.success("Deposit successful bonus");
      setOpen(false);
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Deposit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogDescription>{`Deposit funds to ${username}`}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit((values) => mutate(values))} noValidate>
            <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <FormPhoneInput
                control={control}
                name="mobile"
                label="Mobile Number"
                type="number"
                required
              />
              <FormInput
                control={control}
                name="amount"
                label="Amount"
                type="number"
                step="0.01"
                required
              />
              <FormDateTimePicker
                control={control}
                name="paymentdate"
                label="Payment Date"
                required
                format="PPP HH:mm"
              />
              <FormInput
                control={control}
                name="paymentreference"
                label="Payment Reference"
                required
              />
              <FormSelect
                control={control}
                name="paymentmode"
                label="Payment Mode"
                required
                options={Object.entries(PaymentMode).map(([key, value]) => ({
                  label: key,
                  value,
                }))}
              />
              <FormInput
                control={control}
                name="shortcode"
                label="Short Code"
                required
              />
              <FormInput
                control={control}
                name="paidby"
                label="Paid By"
                required
              />
            </div>

            <div className="mt-2 flex w-full justify-between gap-2 border-t pt-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <FormButton isLoading={isPending} loadingText="Processing...">
                Deposit
              </FormButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
