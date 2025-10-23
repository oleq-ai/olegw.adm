export interface MerchantAccount {
  id?: string;
  accountname?: string;
  bankcode?: string;
  accountnumber?: string;
  revenue?: string;
  transactioncount?: string;
  successrate?: string;
  active?: string;
}

export interface MerchantAccountsResponse {
  status: number;
  message: string;
  data: MerchantAccount[];
}

export interface MerchantAccountsQuery {
  id: string;
  merchantid: string;
  bankcode: string;
}
