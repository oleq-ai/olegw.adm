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
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import { IssueBonusDto, issueBonusDto } from "@/lib/players/dto/player.dto";
import { issueBonusActions } from "@/lib/players/players.actions";
import { TAGS } from "@/lib/shared/constants";

type Props = {
  username: string;
  privatekey: string;
  publickey: string;
};

export default function IssueBonusDialogue({
  username,
  privatekey,
  publickey,
}: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<IssueBonusDto>({
    resolver: zodResolver(issueBonusDto),
    defaultValues: { bonus: "", description: "", privatekey },
  });

  const { control, handleSubmit, reset } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: IssueBonusDto) => {
      const res = await issueBonusActions(values);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TAGS.PLAYERS, { publickey }],
      });
      reset();
      toast.success("Bonus issued successfully");
      setOpen(false);
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Issue Bonus
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Issue Bonus</DialogTitle>
          <DialogDescription>{`Issue a bonus to ${username}`}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit((values) => mutate(values))} noValidate>
            <>
              <div className="grid gap-4 py-4">
                <FormInput
                  control={control}
                  name="bonus"
                  label="Bonus Amount"
                  type="number"
                  step="0.01"
                  required
                />
                <FormTextArea
                  control={control}
                  name="description"
                  label="Description"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <FormButton isLoading={isPending} loadingText="Processing...">
                  Issue Bonus
                </FormButton>
              </div>
            </>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
