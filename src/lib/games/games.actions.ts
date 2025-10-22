"use server";

import { getErrorMessage } from "../get-error-message";
import { PaginatedResponse, Response } from "../shared/types";
import { CreateGameDto } from "./dto/game.dto";
import { getGamesDto } from "./dto/get-games.dto";
import { GameService } from "./games.service";
import { Game } from "./types/game.types";

const gameService = new GameService();

export async function createGameAction(
  values: CreateGameDto
): Promise<Response<void>> {
  try {
    await gameService.create(values);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getGamesAction(): Promise<
  Response<PaginatedResponse<Game>>
> {
  try {
    const { data, meta } = await gameService.findAll();
    return {
      success: true,
      data: { data: getGamesDto(data), meta: meta },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getGameAction(gameref: string): Promise<Response<Game>> {
  try {
    const data = await gameService.findOne(gameref);
    return { success: true, data: getGamesDto([data])[0] };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
