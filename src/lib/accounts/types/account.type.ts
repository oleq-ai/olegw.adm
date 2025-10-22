export type Transactiontype =
  | "BETWIN"
  | "BETWITHDRAW"
  | "PAYMENT"
  | "WITHDRAWAL";

export interface Statement {
  date: string;
  reference: string;
  transactiontype: Transactiontype;
  narration: string;
  debit: string;
  credit: string;
  balance: string;
}
