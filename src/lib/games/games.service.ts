import "server-only";

import { Fetcher } from "../api/api.service";
import { PaginatedResponse } from "../shared/types";
import { CreateGameDto } from "./dto/game.dto";
import { GameResponse } from "./types/game.types";

export class GameService {
  constructor(private fetcher = new Fetcher()) {}

  async create(data: CreateGameDto): Promise<void> {
    await this.fetcher.request("/", {
      data: { operation: "savegame", ...data },
    });
  }

  async findAll(): Promise<PaginatedResponse<GameResponse>> {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: GameResponse[];
    }>("/", { data: { operation: "getgames" } });

    const paginated: PaginatedResponse<GameResponse> = {
      data: res.data,
      meta: {
        currentPage: 1,
        itemCount: res.data.length,
        pageCount: 1,
        pageSize: 10,
      },
    };

    return paginated;
  }

  async findOne(gameref: string): Promise<GameResponse> {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: GameResponse[];
    }>("/", { data: { operation: "getgames", gameref } });

    const game = res.data[0];

    if (!game) throw new Error("Game not found");

    return game;
  }
}
