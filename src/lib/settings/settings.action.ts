"use server";

import { getErrorMessage } from "../get-error-message";
import { Response } from "../shared/types";
import { SettingsDto } from "./dto/settings.dto";
import { SettingsService } from "./settings.service";
import { Settings } from "./types/settings.types";

const settingsService = new SettingsService();

export async function getSettingsActions(): Promise<Response<Settings>> {
  try {
    const settings = await settingsService.findOne();
    return { success: true, data: settings };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updateSettingsActions(
  settings: SettingsDto
): Promise<Response<void>> {
  try {
    await settingsService.update(settings);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
