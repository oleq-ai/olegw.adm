import { Transactiontype } from "../types/account.type";

export const transactionTypeOptions: {
  label: string;
  value: Transactiontype;
}[] = [
  { label: "BET WIN", value: "BETWIN" },
  { label: "BET WITHDRAW", value: "BETWITHDRAW" },
  { label: "PAYMENT", value: "PAYMENT" },
  { label: "WITHDRAWAL", value: "WITHDRAWAL" },
];

export const accountType = {
  "20": "Deposits",
  "21": "Winnings",
  "22": "Bonuses",
} as const;
