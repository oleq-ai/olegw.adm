"use client";

import React, { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateClientSettingsAction } from "@/lib/players/players.actions";
import { ClientSettings } from "@/lib/players/types/user.types";
import { TAGS } from "@/lib/shared/constants";

interface ClientSettingsDialogProps {
  publickey: string;
  username: string;
  currentSettings?: Partial<ClientSettings>;
}

export default function PlayerSettingsDialog({
  publickey,
  username,
  currentSettings = {},
}: ClientSettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ClientSettings>({
    withdrawal: currentSettings.withdrawal ?? true,
    deposit: currentSettings.deposit ?? true,
    play: currentSettings.play ?? true,
    login: currentSettings.login ?? true,
    testmodedisabled: currentSettings.testmodedisabled ?? false,
  });

  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: updateClientSettingsAction,
    onSuccess: () => {
      toast.success("Client settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: [TAGS.PLAYERS, { publickey }],
      });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(
        `Failed to update settings: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      publickey,
      settings,
    });
  };

  const handleSettingChange = (key: keyof ClientSettings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Client Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Client Settings</DialogTitle>
          <DialogDescription>
            Manage permissions and settings for {username}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Account Permissions</CardTitle>
              <CardDescription>
                Control what actions this user can perform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="login" className="text-sm font-medium">
                  Login Access
                </Label>
                <Switch
                  id="login"
                  checked={settings.login}
                  onCheckedChange={(value) =>
                    handleSettingChange("login", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="play" className="text-sm font-medium">
                  Betting/Play Access
                </Label>
                <Switch
                  id="play"
                  checked={settings.play}
                  onCheckedChange={(value) =>
                    handleSettingChange("play", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="deposit" className="text-sm font-medium">
                  Deposit Access
                </Label>
                <Switch
                  id="deposit"
                  checked={settings.deposit}
                  onCheckedChange={(value) =>
                    handleSettingChange("deposit", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="withdrawal" className="text-sm font-medium">
                  Withdrawal Access
                </Label>
                <Switch
                  id="withdrawal"
                  checked={settings.withdrawal}
                  onCheckedChange={(value) =>
                    handleSettingChange("withdrawal", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="testmode" className="text-sm font-medium">
                  Disable Test Mode
                </Label>
                <Switch
                  id="testmode"
                  checked={settings.testmodedisabled}
                  onCheckedChange={(value) =>
                    handleSettingChange("testmodedisabled", value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Settings"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
