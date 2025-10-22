import countryData from "./countries.json";

export type Country = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: number;
  capital: string;
  currency: string;
  currency_name: string;
  region: string;
  subregion: string;
};

export const countries: Country[] = countryData;
