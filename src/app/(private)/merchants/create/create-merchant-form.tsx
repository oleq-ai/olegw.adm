"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { SaveMerchantDto } from "@/lib/merchants/dto/merchant.dto";
import { saveMerchantAction } from "@/lib/merchants/merchant.actions";

const createMerchantSchema = z.object({
  merchantcode: z.string().min(1, "Merchant code is required"),
  name: z.string().min(1, "Merchant name is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  active: z.enum(["0", "1"], {
    errorMap: () => ({ message: "Please select a status" }),
  }),
});

type CreateMerchantFormData = z.infer<typeof createMerchantSchema>;

interface CreateMerchantFormProps {
  initialData?: Partial<SaveMerchantDto>;
  isEdit?: boolean;
}

export default function CreateMerchantForm({
  initialData,
  isEdit = false,
}: CreateMerchantFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateMerchantFormData>({
    resolver: zodResolver(createMerchantSchema),
    defaultValues: {
      merchantcode: initialData?.merchantcode || "",
      name: initialData?.name || "",
      contact: initialData?.contact || "",
      email: initialData?.email || "",
      mobile: initialData?.mobile || "",
      active: initialData?.active || "1",
    },
  });

  const onSubmit = async (data: CreateMerchantFormData) => {
    try {
      setIsSubmitting(true);

      const merchantData: SaveMerchantDto = {
        ...data,
        merchantid: initialData?.merchantid || "", // Empty for new merchants
      };

      const result = await saveMerchantAction(merchantData);

      if (result.success) {
        toast.success(
          isEdit
            ? "Merchant updated successfully!"
            : "Merchant created successfully!"
        );
        router.push("/merchants");
      } else {
        toast.error(result.error || "Failed to save merchant");
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
          {isEdit ? "Edit Merchant" : "Create New Merchant"}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {isEdit
            ? "Update merchant information and settings"
            : "Add a new merchant to the system"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="merchantcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Merchant Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter merchant code"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Merchant Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter merchant name"
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
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Contact Person
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter contact person name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
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
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter mobile number"
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
                {isSubmitting
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                    ? "Update Merchant"
                    : "Create Merchant"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
