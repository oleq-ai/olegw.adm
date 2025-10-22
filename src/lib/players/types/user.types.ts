export interface Player {
  publickey: string;
  msisdn: string;
  username: string;
  totaldeposits: string;
  totalwithdrawals: string;
  bets: string;
  won: string;
  bettotal: string;
  betwinnings: string;
  createdon: string;
}

export interface PlayerDetails {
  msisdn: string;
  privatekey: string;
  username: string;
  totaldeposits: string;
  totalwithdrawals: string;
  bets: string;
  won: string;
  bettotal: string;
  betwinnings: string;
  createdon: string;
  accounts: Account[];
  totalbalance: number;
}

interface Account {
  groupid: "20" | "21" | "22";
  account: string;
  balance: number;
  currency: string;
}

export enum PaymentMode {
  MPESA = "MPESA",
}

export type BonusConfigResponse = {
  bonusref: string;
  name: string;
  bonustype: string;
  condition: string;
  conditionval: string;
  bonus: string;
  description: string;
  startdate: string;
  enddate: string;
  starttime: string;
  endtime: string;
  active: string;
  createdby: string;
  createdon: string;
  utctime: string;
  updatedby: string;
  bonusmode: string;
  bonusname: string;
  repeat: string;
};

export interface ClientSettings {
  withdrawal: boolean;
  deposit: boolean;
  play: boolean;
  login: boolean;
  testmodedisabled: boolean;
}

export interface ClientSettingsResponse {
  status: number;
  message: string;
}
