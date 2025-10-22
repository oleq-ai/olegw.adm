"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BonusConfigResponse } from "@/lib/players/types/user.types";

type ViewBonusDialogProps = {
  bonus: BonusConfigResponse | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ViewBonusDialog({
  bonus,
  isOpen,
  onClose,
}: ViewBonusDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: string) => {
    return parseFloat(amount).toFixed(2);
  };

  if (!bonus) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bonus Configuration Details</DialogTitle>
          <DialogDescription>
            View details for {bonus.bonusname}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium">Bonus Reference</Label>
                <div className="mt-2">
                  <span className="font-mono text-sm">{bonus.bonusref}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-2">
                  <Badge
                    variant={
                      bonus.active === "True" ? "default" : "destructive"
                    }
                  >
                    {bonus.active === "True" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">Bonus Name</Label>
              <div className="mt-2">
                <span className="font-medium">{bonus.bonusname}</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium">Bonus Type</Label>
                <div className="mt-2">
                  <Badge variant="secondary">{bonus.bonustype}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium">Bonus Mode</Label>
                <div className="mt-2">
                  <span className="text-sm">
                    {bonus.bonusmode || "Not available"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium">Condition</Label>
                <div className="mt-2">
                  <span className="text-sm">{bonus.condition}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium">Condition Value</Label>
                <div className="mt-2">
                  <span className="text-sm">
                    {formatCurrency(bonus.conditionval)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium">Bonus Amount</Label>
                <div className="mt-2">
                  <span className="text-sm font-medium">
                    {formatCurrency(bonus.bonus)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {bonus.description && (
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium">Description</Label>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    {bonus.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">Start Date</Label>
              <div className="mt-2">
                <span className="text-sm">{bonus.startdate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">End Date</Label>
              <div className="mt-2">
                <span className="text-sm">{bonus.enddate}</span>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm font-medium">Created On</Label>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">
                  {formatDate(bonus.createdon)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
