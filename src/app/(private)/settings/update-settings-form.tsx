"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Form } from "@/components/ui/form";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import { countries } from "@/data/countries";
import {
  CURRENCIES,
  LANGUAGES,
} from "@/lib/settings/constants/settings.constant";
import { SettingsDto, settingsSchema } from "@/lib/settings/dto/settings.dto";
import { updateSettingsActions } from "@/lib/settings/settings.action";

type Props = {
  defaultValues: SettingsDto;
};

export default function UpdateSettingsForm({ defaultValues }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<SettingsDto>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const resetForm = () => {
    form.reset(defaultValues);
  };

  const onSubmit = async (data: SettingsDto) => {
    const res = await updateSettingsActions(data);
    if (!res.success) {
      toast.error("Error updating settings", { description: res.error });
      return;
    }

    toast.success("Settings updated", {
      description: "Your settings have been saved successfully.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Settings
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Platform Settings</DialogTitle>
          <DialogDescription>
            Make changes to your platform configuration here.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormCombobox
                control={form.control}
                name="country"
                placeholder="Select country"
                label="Country"
                required
                options={countries.map((country) => ({
                  value: country.iso2,
                  label: country.name,
                }))}
              />

              <FormInput
                control={form.control}
                name="operator"
                placeholder="Select operator"
                label="Operator"
                required
              />

              <FormCombobox
                control={form.control}
                name="lang"
                placeholder="Select language"
                label="Language"
                required
                options={LANGUAGES}
              />

              <FormCombobox
                control={form.control}
                name="currency"
                placeholder="Select currency"
                label="Currency"
                required
                options={CURRENCIES}
              />

              <FormInput
                control={form.control}
                name="allowedAge"
                placeholder="Enter minimum age"
                label="Minimum Age"
                required
                description="Minimum age required for users (18-25)"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
