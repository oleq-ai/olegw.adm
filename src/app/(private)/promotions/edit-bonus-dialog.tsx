"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BonusConfigResponse } from "@/lib/players/types/user.types";

import BonusForm from "./bonus-form";

type EditBonusDialogProps = {
  bonus: BonusConfigResponse | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditBonusDialog({
  bonus,
  isOpen,
  onClose,
}: EditBonusDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Bonus Configuration</DialogTitle>
          <DialogDescription>
            Update the bonus configuration for {bonus?.bonusname}
          </DialogDescription>
        </DialogHeader>
        {bonus && (
          <BonusForm
            bonus={bonus}
            isEdit={true}
            onSuccess={onClose}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
