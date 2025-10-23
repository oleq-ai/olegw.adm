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
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((values) => mutate(values))}
            className="space-y-6"
            noValidate
          >
            {/* Role Information */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Role Information
                </CardTitle>
                <CardDescription>Basic details about the role</CardDescription>
              </CardHeader>
              <CardContent>
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
            </Card>

            {/* Permissions & Access */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-200 bg-gray-50">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Permissions & Access
                </CardTitle>
                <CardDescription>Assign modules to this role</CardDescription>
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

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
              <FormButton
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push("/roles")}
              >
                Cancel
              </FormButton>
              <FormButton
                type="submit"
                isLoading={isPending}
                loadingText={isUpdate ? "Updating..." : "Creating..."}
                size="lg"
                className="gap-2"
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
