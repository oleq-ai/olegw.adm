"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveMerchantAccountDto } from "@/lib/merchants/dto/merchant-account.dto";
import { saveMerchantAccountAction } from "@/lib/merchants/merchant.actions";

const createAccountSchema = z.object({
  merchantid: z.string().min(1, "Merchant ID is required"),
  accounttype: z.string().min(1, "Account type is required"),
  name: z.string().min(1, "Account name is required"),
  account: z.string().min(1, "Account number is required"),
  bankcode: z.string().min(1, "Bank code is required"),
  active: z.enum(["0", "1"], {
    errorMap: () => ({ message: "Please select a status" }),
  }),
  credentials: z
    .array(
      z.object({
        name: z.string().min(1, "Credential name is required"),
        value: z.string().min(1, "Credential value is required"),
      })
    )
    .min(1, "At least one credential is required"),
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

interface CreateAccountFormProps {
  merchantid: string;
}

export default function CreateAccountForm({
  merchantid,
}: CreateAccountFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      merchantid,
      accounttype: "",
      name: "",
      account: "",
      bankcode: "",
      active: "1",
      credentials: [{ name: "", value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "credentials",
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    try {
      setIsSubmitting(true);

      const accountData: SaveMerchantAccountDto = {
        ...data,
      };

      const result = await saveMerchantAccountAction(accountData);

      if (result.success) {
        toast.success("Merchant account created successfully!");
        router.push(`/merchants/${merchantid}/accounts`);
      } else {
        toast.error(result.error || "Failed to save merchant account");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Create New Account
        </CardTitle>
        <CardDescription className="text-gray-600">
          Add a new bank account for this merchant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="accounttype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Account Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Paybill">Paybill</SelectItem>
                        <SelectItem value="Bank">Bank</SelectItem>
                        <SelectItem value="Mobile Money">
                          Mobile Money
                        </SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Account Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter account name"
                        {...field}
                        className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Account Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter account number"
                        {...field}
                        className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Bank Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter bank code (e.g., MPESA)"
                        {...field}
                        className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Status
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Credentials Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Credentials
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "", value: "" })}
                >
                  Add Credential
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center space-x-4 rounded-lg border border-gray-200 p-4"
                >
                  <FormField
                    control={form.control}
                    name={`credentials.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., ConsumerKey"
                            {...field}
                            className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`credentials.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Value
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter credential value"
                            {...field}
                            className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                      className="mt-6"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="rounded-lg border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
