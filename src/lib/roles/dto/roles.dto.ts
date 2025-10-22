import { z } from "zod";

import { PaginationDto } from "@/lib/shared/dto/pagination.dto";

export const ADMIN_ROLES = ["super admin", "admin", "superadmin", "sa"];

export const createRoleSchema = z.object({
  roleid: z.string().optional(),
  rolename: z
    .string()
    .min(3)
    .refine((val) => !ADMIN_ROLES.includes(val.toLowerCase()), {
      message: "Forbidden role name",
    }),
  description: z.string().optional(),
  modules: z.array(z.string()),
});

export type CreateRoleDto = z.infer<typeof createRoleSchema>;

export interface RoleQuery extends PaginationDto {
  filter?: string;
}
