"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, FileText, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
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
import FormInput from "@/components/ui/form-input";
import FormModuleSelector from "@/components/ui/form-module-selector";
import FormTextArea from "@/components/ui/form-textarea";
import { moduleItems } from "@/data/modules";
import { CreateRoleDto, createRoleSchema } from "@/lib/roles/dto/roles.dto";
import { createRoleAction } from "@/lib/roles/role.actions";
import { TAGS } from "@/lib/shared/constants";

interface Props {
  defaultValues?: CreateRoleDto;
  isUpdate?: boolean;
  canUpdate: boolean;
}

export default function CreateRoleForm({
  defaultValues,
  isUpdate,
  canUpdate,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const action = isUpdate ? "update" : "create";

  const form = useForm<CreateRoleDto>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: defaultValues ?? {
      rolename: "",
      description: "",
      modules: [],
    },
  });

  const { control, handleSubmit, reset } = form;

  const { isPending, mutate } = useMutation({
    mutationFn: (values: CreateRoleDto) => {
      if (!canUpdate) {
        throw new Error(`You are not authorized to ${action} this role`);
      }
      return createRoleAction(values);
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: (res) => {
      if (!res.success) throw new Error(res.error);
      toast.success(`Role ${isUpdate ? "updated" : "created"} successfully`);
      reset();
      queryClient.invalidateQueries({ queryKey: [TAGS.ROLE] });
      router.replace("/roles");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((values) => mutate(values))}
            className="space-y-8"
            noValidate
          >
            {/* Role Information */}
            <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    Role Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Basic details about the role
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <FormInput
                      control={control}
                      name="rolename"
                      label="Role Name"
                      placeholder="Enter role name"
                      className="w-full"
                      required
                      disabled={!canUpdate}
                    />
                    <FormTextArea
                      control={control}
                      name="description"
                      label="Description"
                      placeholder="Enter role description"
                      className="w-full"
                      disabled={!canUpdate}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Permissions & Access */}
            <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-green-50/50 to-emerald-50/50 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    Permissions & Access
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Assign modules and permissions to this role
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <FormModuleSelector
                    control={control}
                    name="modules"
                    label="Select Modules"
                    options={moduleItems}
                    required
                    disabled={!canUpdate}
                    height="500px"
                  />
                </CardContent>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-4 rounded-xl border border-gray-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:flex-row sm:justify-end">
              <FormButton
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push("/roles")}
                className="rounded-lg border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </FormButton>
              <FormButton
                type="submit"
                isLoading={isPending}
                loadingText={isUpdate ? "Updating..." : "Creating..."}
                size="lg"
                className="gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={!canUpdate}
              >
                <Shield className="h-4 w-4" />
                {isUpdate ? "Update Role" : "Create Role"}
              </FormButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
