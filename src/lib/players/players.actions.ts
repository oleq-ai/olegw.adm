"use server";

import { getErrorMessage } from "../get-error-message";
import { PaginationDto } from "../shared/dto/pagination.dto";
import { PaginatedResponse, Response } from "../shared/types";
import {
  BonusConfigDto,
  ClientSettingsDto,
  DepositDto,
  IssueBonusDto,
} from "./dto/player.dto";
import { PlayerService } from "./players.service";
import { BonusConfigResponse, Player, PlayerDetails } from "./types/user.types";

const playerService = new PlayerService();

export async function getPlayersActions(
  query: PaginationDto
): Promise<Response<PaginatedResponse<Player>>> {
  try {
    const players = await playerService.findAll(query);
    return { success: true, data: players };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getPlayerDetailActions(
  publickey: string
): Promise<Response<PlayerDetails>> {
  try {
    const player = await playerService.findOne(publickey);
    return { success: true, data: player };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function issueBonusActions(
  values: IssueBonusDto
): Promise<Response<void>> {
  try {
    await playerService.issueBonus(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getBonusConfigActions(
  bonusref: string = ""
): Promise<Response<BonusConfigResponse[]>> {
  try {
    const data = await playerService.getBonusConfig(bonusref);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function bonusConfigActions(
  values: BonusConfigDto
): Promise<Response<void>> {
  try {
    await playerService.bonusConfig(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function depositFundsAction(values: DepositDto) {
  try {
    await playerService.deposit(values);

    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: getErrorMessage(error) };
  }
}

export async function updateClientSettingsAction(
  values: ClientSettingsDto
): Promise<Response<void>> {
  try {
    await playerService.updateClientSettings(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
