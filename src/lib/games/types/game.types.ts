export enum GameCategory {
  Crash = "crash",
  Slots = "slots",
  Spin = "spin",
  Table = "table",
  Virtual = "virtual",
}

export interface GameResponse {
  gameref?: string;
  gamename: string;
  gamecode: string;
  active: string;
  deleted: string;
  tag: string;
  hot: string;
  featured: string;
  category: string;
  gamedata: GameData;
}
export interface Game {
  gameref?: string;
  gamename: string;
  gamecode: string;
  tag: string;
  category: string;
  active: boolean;
  deleted: boolean;
  hot: boolean;
  featured: boolean;
  gamedata: GameData;
}

interface GameData {
  banner: string;
  funnydemourl: string;
  funnyprodurl: string;
  demourl: string;
  produrl: string;
}
