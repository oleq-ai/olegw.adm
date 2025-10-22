import { cities } from "@/data/cities";
import { countries } from "@/data/countries";
import { states } from "@/data/states";

export const countryOptions = countries.map((country) => ({
  id: country.id,
  label: country.name,
  value: country.iso2,
}));

export const stateOptions = (countryId?: number) => {
  if (!countryId) return [];

  const country = states.filter((country) => country.id === countryId)[0];

  if (!country) return [];

  return country.states.map((state) => ({
    id: state.id,
    label: state.name,
    value: state.name,
  }));
};

export const cityOptions = (countryId?: number, stateId?: number) => {
  if (!countryId || !stateId) return [];
  const country = cities.filter((country) => country.id === countryId)[0];
  if (!country) return [];
  const cityData = country.states.find((state) => state.id === stateId)?.cities;
  if (!cityData) return [];
  return cityData.map((city) => ({ value: city.name, label: city.name }));
};
