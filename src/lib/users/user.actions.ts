"use server";

import { getErrorMessage } from "../get-error-message";
import { PaginatedResponse, Response } from "../shared/types";
import { CreateUserDto, UserQuery } from "./dto/user.dto";
import { User } from "./types/user.types";
import { UserService } from "./users.service";

const userService = new UserService();

export async function createUserAction(
  values: CreateUserDto
): Promise<Response<void>> {
  try {
    await userService.create(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getUsersActions(
  query: UserQuery
): Promise<Response<PaginatedResponse<User>>> {
  try {
    const users = await userService.findAll(query);
    return { success: true, data: users };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getUserActions(ukey: string): Promise<Response<User>> {
  try {
    const user = await userService.findOne(ukey);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
