export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  type: "payment" | "refund" | "withdrawal" | "deposit";
  merchant: string;
  customer: string;
  createdAt: string;
  completedAt: string | null;
  failureReason?: string;
  errorCode?: string;
  // API-specific fields
  reference?: string;
  ukey?: string;
  countrycode?: string;
  operation?: string;
  transactionid?: string;
}

export interface TransactionResponse {
  status: number;
  message: string;
  data: Transaction[];
}
