import { Fetcher } from "../api/api.service";
import { SettingsDto } from "./dto/settings.dto";
import { Settings } from "./types/settings.types";

export class SettingsService {
  constructor(private fetcher = new Fetcher()) {}

  private initialSettings: Settings = {
    country: "KE",
    operator: "operator1",
    lang: "en",
    currency: "KES",
    allowedAge: "18",
  };

  async findOne() {
    return this.initialSettings;
  }

  async update(settings: SettingsDto) {
    this.initialSettings = {
      ...this.initialSettings,
      ...settings,
    };
  }
}
