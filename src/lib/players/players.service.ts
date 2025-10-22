import "server-only";

import { Fetcher } from "../api/api.service";
import { PaginationDto } from "../shared/dto/pagination.dto";
import { Meta } from "../shared/types";
import {
  BonusConfigDto,
  ClientSettingsDto,
  DepositDto,
  IssueBonusDto,
} from "./dto/player.dto";
import { BonusConfigResponse, Player, PlayerDetails } from "./types/user.types";

export class PlayerService {
  constructor(private fetcher = new Fetcher()) {}

  async findAll({
    page,
    pageSize,
    startdate,
    enddate,
    ...rest
  }: PaginationDto) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: Player[];
      totalrows: number;
    }>("/", {
      data: {
        operation: "pullclients",
        page: page - 1,
        rows: pageSize,
        ...(startdate && { startdate }),
        ...(enddate && { enddate }),
        ...rest,
      },
    });

    const { data, totalrows } = res;

    const pageCount = Math.ceil(Number(totalrows) / Number(pageSize));

    const meta: Meta = {
      pageCount,
      currentPage: page,
      itemCount: totalrows,
      pageSize,
    };

    return { data, meta };
  }

  async findOne(publickey: string) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: PlayerDetails;
    }>("/", { data: { operation: "pullclient", publickey } });

    return res.data;
  }

  async issueBonus(values: IssueBonusDto) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
    }>("/", { data: { operation: "issuebonus", ...values } });

    return res;
  }

  async getBonusConfig(bonusref: string = "") {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: BonusConfigResponse[];
      totalrows: number;
    }>("/", {
      data: {
        operation: "getbonusconfig",
        bonusref,
      },
    });

    return res.data; // Return the array of bonus configs
  }

  async bonusConfig(values: BonusConfigDto) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
    }>("/", { data: { operation: "bonusconfig", ...values } });

    return res;
  }

  async deposit(values: DepositDto) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
    }>("/", { data: { operation: "depositfunds", ...values } });

    return res;
  }

  async updateClientSettings(values: ClientSettingsDto) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
    }>("/", {
      data: {
        operation: "clientsettings",
        publickey: values.publickey,
        settings: values.settings,
      },
    });

    return res;
  }
}
