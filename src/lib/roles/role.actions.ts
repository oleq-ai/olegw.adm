"use server";

import { getErrorMessage } from "../get-error-message";
import { PaginatedResponse, Response } from "../shared/types";
import { CreateRoleDto, RoleQuery } from "./dto/roles.dto";
import { RoleService } from "./roles.service";
import { RoleResponse } from "./types/roles.types";

const roleService = new RoleService();

export async function getRolesAction(
  query: RoleQuery
): Promise<Response<PaginatedResponse<RoleResponse>>> {
  try {
    const res = await roleService.findAll(query);
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getRoleAction(
  roleid: string
): Promise<Response<RoleResponse>> {
  try {
    const res = await roleService.getRole(roleid);
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function createRoleAction(
  values: CreateRoleDto
): Promise<Response<void>> {
  try {
    await roleService.create(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
