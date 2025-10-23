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
import { Form } from "@/components/ui/form";
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
        username: initialValues.username || "",
        password: "",
        confirmPassword: "",
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
        username: "",
        password: "",
        confirmPassword: "",
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
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((values) => mutate(values))}
            className="space-y-6"
            noValidate
          >
            {/* Personal Information */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Basic details about the user</CardDescription>
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
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>How to reach this user</CardDescription>
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
            </Card>

            {/* Account Settings */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Account Settings
                </CardTitle>
                <CardDescription>
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
              </CardContent>
            </Card>

            {/* Permissions & Access */}
            {isCustomRole && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Permissions & Access
                  </CardTitle>
                  <CardDescription>Assign modules to this user</CardDescription>
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
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
              <FormButton
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push("/users")}
              >
                Cancel
              </FormButton>
              <FormButton
                type="submit"
                isLoading={isPending}
                size="lg"
                className="gap-2"
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
