import cityData from "./cities.json";

export type City = {
  id: number;
  states: { id: number; cities: { name: string }[] }[];
};

export const cities: City[] = cityData;
