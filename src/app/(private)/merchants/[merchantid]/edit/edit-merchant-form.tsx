"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Building2, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormPhoneInput from "@/components/ui/form-phone-input";
import FormSelect from "@/components/ui/form-select";
import { saveMerchantAction } from "@/lib/merchants/merchant.actions";
import type { MerchantDetails } from "@/lib/merchants/types/merchant.types";

const editMerchantSchema = z.object({
  merchantcode: z.string().min(1, "Merchant code is required"),
  name: z.string().min(1, "Merchant name is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  active: z.enum(["0", "1"]),
});

type EditMerchantFormData = z.infer<typeof editMerchantSchema>;

interface EditMerchantFormProps {
  merchant: MerchantDetails;
}

export default function EditMerchantForm({ merchant }: EditMerchantFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditMerchantFormData>({
    resolver: zodResolver(editMerchantSchema),
    defaultValues: {
      merchantcode: merchant.merchantcode,
      name: merchant.name,
      contact: merchant.contactperson,
      email: merchant.email,
      mobile: merchant.mobile,
      active: merchant.active === "True" ? "1" : "0",
    },
  });

  const onSubmit = async (data: EditMerchantFormData) => {
    setIsLoading(true);
    try {
      const result = await saveMerchantAction({
        merchantid: merchant.merchantid,
        merchantcode: data.merchantcode,
        name: data.name,
        contact: data.contact,
        email: data.email,
        mobile: data.mobile,
        active: data.active,
      });

      if (result.success) {
        toast.success("Merchant updated successfully");
        router.push(`/merchants/${merchant.merchantid}`);
      } else {
        toast.error(result.error || "Failed to update merchant");
      }
    } catch {
      toast.error("An error occurred while updating the merchant");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Merchant
              </h1>
              <p className="mt-2 text-gray-600">
                Update merchant information and settings
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Edit Form */}
      <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Building2 className="h-5 w-5 text-blue-600" />
            Merchant Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormInput
                  control={form.control}
                  name="merchantcode"
                  label="Merchant Code"
                  placeholder="Enter merchant code"
                  description="Unique business identifier"
                />

                <FormInput
                  control={form.control}
                  name="name"
                  label="Merchant Name"
                  placeholder="Enter merchant name"
                  description="Official business name"
                />

                <FormInput
                  control={form.control}
                  name="contact"
                  label="Contact Person"
                  placeholder="Enter contact person name"
                  description="Primary contact person"
                />

                <FormInput
                  control={form.control}
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  description="Business email address"
                />

                <FormPhoneInput
                  control={form.control}
                  name="mobile"
                  label="Mobile Number"
                  placeholder="Enter mobile number"
                  description="Contact mobile number"
                />

                <FormSelect
                  control={form.control}
                  name="active"
                  label="Account Status"
                  placeholder="Select status"
                  description="Merchant account status"
                  options={[
                    { value: "1", label: "Active" },
                    { value: "0", label: "Inactive" },
                  ]}
                />
              </div>

              <div className="flex items-center justify-end space-x-3 border-t border-gray-200 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Updating..." : "Update Merchant"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
