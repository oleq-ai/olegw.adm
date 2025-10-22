import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  title: string;
  description: string;
  actionLabel: string;
  actionType: "destructive" | "outline" | "default";
  onAction: () => Promise<void>;
  children?: React.ReactNode;
  onSubmit?: () => Promise<void>;
};

export default function ActionDialog({
  title,
  description,
  actionLabel,
  actionType,
  onAction,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      await onAction();
      toast.success(`Action "${title}" completed successfully`);
      setOpen(false);
    } catch (error) {
      toast.error(
        `Failed to complete action: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={actionType} size="sm">
          {title}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant={actionType}
            onClick={handleAction}
            disabled={loading}
          >
            {loading ? "Processing..." : actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
