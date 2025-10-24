"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { diff } from "deep-object-diff";
import { CheckCircle2, Mail, Settings, User } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import FormButton from "@/components/ui/form-button";
import FormCombobox from "@/components/ui/form-combobox";
import FormInput from "@/components/ui/form-input";
import FormModuleSelector from "@/components/ui/form-module-selector";
import FormPhoneInput from "@/components/ui/form-phone-input";
import FormSelect from "@/components/ui/form-select";
import { moduleItems } from "@/data/modules";
import { getRolesAction } from "@/lib/roles/role.actions";
import { TAGS } from "@/lib/shared/constants";
import {
  CreateUserDto,
  PartialUserDto,
  createUserSchema,
  partialUserSchema,
} from "@/lib/users/dto/user.dto";
import { Gender } from "@/lib/users/types/user.types";
import { createUserAction } from "@/lib/users/user.actions";

interface Props {
  initialValues?: PartialUserDto;
  canUpdate: boolean;
}

export default function CreateUserForm({ initialValues, canUpdate }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isUpdateMode = !!initialValues;

  const rolesQuery = useQuery({
    queryKey: [TAGS.ROLE],
    queryFn: async () => {
      const res = await getRolesAction({ page: 1, pageSize: 100 });
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const defaultValues: CreateUserDto = initialValues
    ? {
        userkey: initialValues.userkey,
        firstname: initialValues.firstname || "",
        middlename: initialValues.middlename || "",
        lastname: initialValues.lastname || "",
        email: initialValues.email || "",
        mobile: initialValues.mobile || "",
        gender: initialValues.gender || ("" as Gender),
        roleid: initialValues.roleid || "",
        modules: initialValues.modules || [],
        active: initialValues.active ?? true,
        username: initialValues.username || "",
        password: "",
        confirmPassword: "",
        address: initialValues.address || "",
        city: initialValues.city || "",
        county: initialValues.county || "",
        postalcode: initialValues.postalcode || "",
        idtype: initialValues.idtype || "National ID",
        idnumber: initialValues.idnumber || "",
        stations: initialValues.stations || [],
      }
    : {
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        mobile: "",
        gender: "" as Gender,
        roleid: "",
        modules: [],
        active: true,
        username: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        county: "",
        postalcode: "",
        idtype: "National ID",
        idnumber: "",
        stations: [],
      };

  const form = useForm<CreateUserDto>({
    resolver: zodResolver(isUpdateMode ? partialUserSchema : createUserSchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: CreateUserDto) => {
      if (!canUpdate) {
        throw new Error(
          `You are not authorized to ${isUpdateMode ? "update" : "create"} this user`
        );
      }

      let payload: CreateUserDto;

      if (isUpdateMode) {
        const changedFields = diff(
          defaultValues,
          values
        ) as Partial<CreateUserDto>;

        if (!changedFields.password || changedFields.password === "") {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, confirmPassword, ...rest } = changedFields;
          payload = {
            ...rest,
            userkey: initialValues.userkey,
          } as CreateUserDto;
        } else {
          payload = {
            ...changedFields,
            userkey: initialValues.userkey,
          } as CreateUserDto;
        }
      } else {
        payload = values;
      }

      const res = await createUserAction(payload);
      if (!res.success) throw new Error(res.error);
      return res;
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      toast.success(
        `User ${isUpdateMode ? "updated" : "created"} successfully`
      );
      router.push("/users");
      queryClient.invalidateQueries({ queryKey: [TAGS.USER] });
    },
  });

  const roleWatched = useWatch({
    control,
    name: "roleid",
  });
  const rolesData = rolesQuery.data?.data;

  const isCustomRole = roleWatched === "custom";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((values) => mutate(values))}
            className="space-y-8"
            noValidate
          >
            {/* Personal Information */}
            <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                      <User className="h-5 w-5" />
                    </div>
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Basic details about the user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FormInput
                      control={control}
                      name="firstname"
                      label="First Name"
                      placeholder="Enter first name"
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                    <FormInput
                      control={control}
                      name="middlename"
                      label="Middle Name"
                      placeholder="Enter middle name"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                    <FormInput
                      control={control}
                      name="lastname"
                      label="Last Name"
                      placeholder="Enter last name"
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                    <FormSelect
                      control={control}
                      name="gender"
                      label="Gender"
                      placeholder="Select gender"
                      options={Object.entries(Gender).map(([key, value]) => ({
                        label: key,
                        value: value,
                      }))}
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-green-50/50 to-emerald-50/50 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    How to reach this user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormInput
                      control={control}
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="user@example.com"
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                    <FormPhoneInput
                      control={control}
                      name="mobile"
                      label="Phone Number"
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Address Information */}
            <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                      <User className="h-5 w-5" />
                    </div>
                    Address Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    User&apos;s address and location details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FormInput
                      control={control}
                      name="address"
                      label="Address"
                      placeholder="Enter street address"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                    <FormInput
                      control={control}
                      name="city"
                      label="City"
                      placeholder="Enter city"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                    <FormInput
                      control={control}
                      name="county"
                      label="County"
                      placeholder="Enter county"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                    <FormInput
                      control={control}
                      name="postalcode"
                      label="Postal Code"
                      placeholder="Enter postal code"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Identity Information */}
            <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-orange-50/50 to-red-50/50 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                      <User className="h-5 w-5" />
                    </div>
                    Identity Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    User&apos;s identification details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormInput
                      control={control}
                      name="idtype"
                      label="ID Type"
                      placeholder="National ID"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                    <FormInput
                      control={control}
                      name="idnumber"
                      label="ID Number"
                      placeholder="Enter ID number"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                      <Settings className="h-5 w-5" />
                    </div>
                    Account Settings
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Login credentials and role assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {!isUpdateMode && (
                      <FormInput
                        control={control}
                        name="username"
                        label="Username"
                        placeholder="Enter username"
                        className="w-full"
                        required
                        disabled={!canUpdate}
                      />
                    )}
                    <FormInput
                      control={control}
                      name="password"
                      label="Password"
                      type="password"
                      placeholder={
                        isUpdateMode
                          ? "Leave blank to keep current"
                          : "Enter password"
                      }
                      className="w-full"
                      required={!isUpdateMode}
                      disabled={!canUpdate}
                    />
                    <FormInput
                      control={control}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      placeholder={
                        isUpdateMode
                          ? "Leave blank to keep current"
                          : "Confirm password"
                      }
                      className="w-full"
                      required={!isUpdateMode}
                      disabled={!canUpdate}
                    />
                    <FormCombobox
                      control={control}
                      name="roleid"
                      label="Role"
                      placeholder="Select role"
                      isLoading={rolesQuery.isLoading}
                      key={rolesData?.map(({ roleid }) => roleid).join("_")}
                      options={
                        rolesData
                          ? [
                              ...rolesData.map(({ rolename, roleid }) => ({
                                label: rolename,
                                value: roleid,
                              })),
                              { label: "Custom", value: "custom" },
                            ]
                          : [{ label: "Custom", value: "custom" }]
                      }
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!canUpdate}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Active User</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Enable or disable this user account
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Permissions & Access */}
            {isCustomRole && (
              <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 p-6">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      Permissions & Access
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Assign modules to this user
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormModuleSelector
                      control={control}
                      name="modules"
                      label="Select Modules"
                      options={moduleItems}
                      required
                      disabled={!canUpdate}
                    />
                  </CardContent>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-4 rounded-xl border border-gray-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:flex-row sm:justify-end">
              <FormButton
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push("/users")}
                className="rounded-lg border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </FormButton>
              <FormButton
                type="submit"
                isLoading={isPending}
                loadingText={isUpdateMode ? "Updating..." : "Creating..."}
                size="lg"
                className="gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                disabled={!canUpdate}
              >
                <User className="h-4 w-4" />
                {isUpdateMode ? "Update User" : "Create User"}
              </FormButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
