"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormButton from "@/components/ui/form-button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BonusConfigDto, bonusConfigDto } from "@/lib/players/dto/player.dto";
import { bonusConfigActions } from "@/lib/players/players.actions";
import { BonusConfigResponse } from "@/lib/players/types/user.types";
import { cn } from "@/lib/utils";

type BonusFormProps = {
  bonus?: BonusConfigResponse;
  isEdit?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
};

const parseISODate = (isoString: string): Date | undefined => {
  if (!isoString) return undefined;
  try {
    return new Date(isoString);
  } catch {
    return undefined;
  }
};

const formatDateForAPI = (date: Date | undefined): string => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const extractTimeFromISO = (isoString: string): string => {
  if (!isoString) return "00:00";
  try {
    const date = new Date(isoString);
    return format(date, "HH:mm");
  } catch {
    return "00:00";
  }
};

const mapApiToForm = (
  apiBonus: BonusConfigResponse
): Partial<BonusConfigDto> => ({
  bonusref: apiBonus.bonusref,
  active: apiBonus.active === "True" ? "1" : "0",
  name: apiBonus.bonusname || apiBonus.name,
  bonustype: apiBonus.bonustype as "DEPOSIT" | "REFERAL" | "REGISTRATION",
  bonusmode: apiBonus.bonusmode as "FLATFEE" | "PERCENTAGE",
  condition: apiBonus.condition as "MIN" | "MAX" | "EQUAL",
  conditionval: apiBonus.conditionval,
  bonus: apiBonus.bonus,
  description: apiBonus.description,
  startdate: apiBonus.startdate,
  enddate: apiBonus.enddate,
  repeat: apiBonus.repeat,
  starttime: apiBonus.starttime || extractTimeFromISO(apiBonus.startdate),
  endtime: apiBonus.endtime || extractTimeFromISO(apiBonus.enddate),
});

const TimePicker = ({
  value,
  onChange,
  placeholder = "Select time",
}: {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
}) => {
  const [hours, setHours] = React.useState(value ? value.split(":")[0] : "00");
  const [minutes, setMinutes] = React.useState(
    value ? value.split(":")[1] : "00"
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const hourOptions = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const minuteOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleTimeChange = (newHours: string, newMinutes: string) => {
    const timeString = `${newHours}:${newMinutes}`;
    setHours(newHours);
    setMinutes(newMinutes);
    onChange(timeString);
  };

  React.useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setHours(h || "00");
      setMinutes(m || "00");
    }
  }, [value]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <div className="p-4">
          <div className="space-y-4">
            <div className="text-center text-sm font-medium">Select Time</div>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1">
                <label className="mb-1 block text-center text-xs text-gray-500">
                  Hours
                </label>
                <Select
                  value={hours}
                  onValueChange={(h) => handleTimeChange(h, minutes)}
                >
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {hourOptions.map((hour) => (
                      <SelectItem
                        key={hour}
                        value={hour}
                        className="text-center"
                      >
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-6 text-2xl font-bold">:</div>
              <div className="flex-1">
                <label className="mb-1 block text-center text-xs text-gray-500">
                  Minutes
                </label>
                <Select
                  value={minutes}
                  onValueChange={(m) => handleTimeChange(hours, m)}
                >
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {minuteOptions.map((minute) => (
                      <SelectItem
                        key={minute}
                        value={minute}
                        className="text-center"
                      >
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-2xl font-bold text-primary">
                {hours}:{minutes}
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full"
                size="sm"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function BonusForm({
  bonus,
  isEdit = false,
  onSuccess,
  onClose,
}: BonusFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<BonusConfigDto>({
    resolver: zodResolver(bonusConfigDto),
    defaultValues: bonus
      ? mapApiToForm(bonus)
      : {
          bonusref: "AUTO_GENERATED",
          active: "0",
          name: "",
          bonustype: "DEPOSIT",
          bonusmode: "FLATFEE",
          condition: "MIN",
          conditionval: "",
          bonus: "",
          description: "",
          startdate: "",
          enddate: "",
          starttime: "00:00",
          endtime: "23:59",
          repeat: "WEEKLY",
        },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = (values: BonusConfigDto) => {
    let submitValues = { ...values };

    if (values.startdate) {
      submitValues.startdate = formatDateForAPI(parseISODate(values.startdate));
    }
    if (values.enddate) {
      submitValues.enddate = formatDateForAPI(parseISODate(values.enddate));
    }

    if (values.starttime) {
      submitValues.starttime = values.starttime;
    }
    if (values.endtime) {
      submitValues.endtime = values.endtime;
    }

    if (!isEdit) {
      submitValues = { ...submitValues, bonusref: "" };
    } else {
      submitValues = { ...submitValues, bonusref: submitValues.bonusref ?? "" };
    }

    mutate(submitValues);
  };

  const onInvalidSubmit = () => {
    toast.error("Please fill in all required fields correctly");
  };

  const handleButtonClick = () => {
    handleSubmit(onSubmit, onInvalidSubmit)();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: BonusConfigDto) => {
      const safeValues = { ...values, bonusref: values.bonusref ?? "" };

      const res = await bonusConfigActions(safeValues);

      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      if (!isEdit) {
        reset();
      }
      queryClient.invalidateQueries({ queryKey: ["bonus-configs"] });
      toast.success(
        isEdit ? "Bonus updated successfully" : "Bonus created successfully"
      );
      onSuccess?.();
      onClose?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getBonusModeDisplayName = (mode: string) => {
    switch (mode) {
      case "FLATFEE":
        return "Flat Fee";
      case "PERCENTAGE":
        return "Percentage";
      default:
        return mode;
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        {isEdit && (
          <FormField
            control={control}
            name="bonusref"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bonus Reference</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-gray-50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select active status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Inactive</SelectItem>
                  <SelectItem value="1">Active</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bonus Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter bonus name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bonustype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bonus Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bonus type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="REGISTRATION">Registration</SelectItem>
                  <SelectItem value="DEPOSIT">Deposit</SelectItem>
                  <SelectItem value="REFERAL">Referral</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bonusmode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bonus Mode</FormLabel>
              {isEdit && bonus && (
                <div className="mb-2 rounded-md border bg-gray-50 p-2 text-sm text-gray-700">
                  Currently selected:{" "}
                  <span className="font-medium">
                    {getBonusModeDisplayName(bonus.bonusmode)}
                  </span>
                </div>
              )}
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bonus mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FLATFEE">Flat Fee</SelectItem>
                  <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MIN">Minimum</SelectItem>
                  <SelectItem value="MAX">Maximum</SelectItem>
                  <SelectItem value="EQUAL">Equal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="repeat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Frequency</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select repeat frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="BIWEEKLY">Bi-weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="WEEKLY,DAILY,BIWEEKLY,MONTHLY">
                    All Frequencies
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="conditionval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter condition value"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bonus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bonus Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter bonus value"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter bonus description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="startdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(parseISODate(field.value) || new Date(), "PPP")
                        : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseISODate(field.value)}
                      onSelect={(date: Date | undefined) =>
                        field.onChange(date?.toISOString() || "")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="starttime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <TimePicker
                  value={field.value || "00:00"}
                  onChange={field.onChange}
                  placeholder="Select start time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="enddate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(parseISODate(field.value) || new Date(), "PPP")
                        : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseISODate(field.value)}
                      onSelect={(date: Date | undefined) =>
                        field.onChange(date?.toISOString() || "")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="endtime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <TimePicker
                  value={field.value || "23:59"}
                  onChange={field.onChange}
                  placeholder="Select end time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <FormButton
            type="button"
            onClick={handleButtonClick}
            isLoading={isPending}
            loadingText="Saving..."
            className="flex-1"
          >
            {isEdit ? "Update Bonus" : "Create Bonus"}
          </FormButton>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
}
