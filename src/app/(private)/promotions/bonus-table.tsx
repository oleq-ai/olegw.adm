"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getBonusConfigActions } from "@/lib/players/players.actions";
import { BonusConfigResponse } from "@/lib/players/types/user.types";

import BonusForm from "./bonus-form";
import { createBonusTableColumns } from "./bonus-table-coulmns";
import EditBonusDialog from "./edit-bonus-dialog";

export default function BonusTable() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingBonus, setEditingBonus] = useState<BonusConfigResponse | null>(
    null
  );

  const {
    data: bonusConfigs,
    isLoading,
    error,
    isError,
    isRefetching,
  } = useQuery({
    queryKey: ["bonus-configs"],
    queryFn: async () => {
      const res = await getBonusConfigActions("");
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const columns = createBonusTableColumns({
    onEdit: setEditingBonus,
  });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Register New Bonus
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Register New Bonus</DialogTitle>
              <DialogDescription>
                Create a new bonus configuration
              </DialogDescription>
            </DialogHeader>
            <BonusForm
              onSuccess={() => setIsCreateDialogOpen(false)}
              onClose={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={bonusConfigs ?? []}
        error={isError ? error : undefined}
        isFetching={isLoading}
        isRefetching={isRefetching}
      />

      <EditBonusDialog
        bonus={editingBonus}
        isOpen={!!editingBonus}
        onClose={() => setEditingBonus(null)}
      />
    </div>
  );
}
