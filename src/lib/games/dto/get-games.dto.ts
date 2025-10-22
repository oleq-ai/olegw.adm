import { Game, GameResponse } from "../types/game.types";

export function getGamesDto(data: GameResponse[]): Game[] {
  return data.map((game) => ({
    ...game,
    active: game?.active?.toLowerCase() === "true",
    deleted: game?.deleted?.toLowerCase() === "true",
    featured: game?.deleted?.toLowerCase() === "true",
    hot: game?.deleted?.toLowerCase() === "true",
  }));
}
