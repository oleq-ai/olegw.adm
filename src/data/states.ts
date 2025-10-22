import stateData from "./states.json";

export type State = {
  id: number;
  states: { id: number; name: string; state_code: string }[];
};

export const states: State[] = stateData;
