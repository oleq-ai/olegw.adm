import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FormButton from "@/components/ui/form-button";
import { retryWithdrawalAction } from "@/lib/reports/reports.actions";
import { TAGS } from "@/lib/shared/constants";

type Props = {
  transactionRef: string;
};

export default function RetryDialogue({ transactionRef }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await retryWithdrawalAction(transactionRef);
      if (!res.success) throw new Error(res.error);
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Operation successful");
      queryClient.invalidateQueries({ queryKey: [TAGS.WITHDRAWALS] });
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="">
          <RotateCw className="mr-2 size-4" />
          <span className="">Retry</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button disabled={isPending} variant="outline">
              Cancel
            </Button>
          </AlertDialogCancel>

          <FormButton
            isLoading={isPending}
            onClick={() => mutate()}
            variant="destructive"
          >
            Confirm
          </FormButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
