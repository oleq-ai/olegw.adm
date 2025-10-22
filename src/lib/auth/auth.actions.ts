"use server";

import { getErrorMessage } from "../get-error-message";
import { Response } from "../shared/types";
import { AuthService } from "./auth.service";
import {
  ChangePasswordDto,
  ResetPasswordDto,
  SignInDto,
} from "./dto/sign-in.dto";

const authService = new AuthService();

export async function signInAction(values: SignInDto): Promise<Response<void>> {
  try {
    // await authService.signInDev(values);
    await authService.signIn(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function signOutAction(): Promise<Response<void>> {
  try {
    await authService.signOut();
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function resetPasswordAction(
  values: ResetPasswordDto
): Promise<Response<void>> {
  try {
    await authService.resetPassword(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function requestOtpAction(
  phoneNumber: string
): Promise<Response<void>> {
  try {
    await authService.sendOTP(phoneNumber);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function changePasswordAction(
  values: ChangePasswordDto
): Promise<Response<void>> {
  try {
    await authService.changePassword(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
