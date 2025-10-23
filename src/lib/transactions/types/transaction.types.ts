export interface Transaction {
  id: string;
  transactionid: string;
  merchantid: string;
  merchantcode: string;
  bankcode: string;
  shortcode: string;
  transactionmethod: string;
  transactiontype: string;
  reference: string;
  reference1: string;
  negotiatedreference: string;
  msisdn: string;
  firstname: string;
  lastname: string;
  account: string;
  amount: string;
  accbalance: string;
  transactioncost: string;
  narration: string;
  response1: string;
  description1: string;
  checkoutrequestid: string;
  merchantrequestid: string;
  response2: string;
  description2: string;
  transactiondate: string;
  transactiontime: string;
  createdon: string;
  createdby: string;
  ipnsent: string;
  status: string;
  message: string;
  callbackurl: string;
  usercode: string;
}

export interface TransactionResponse {
  status: number;
  data: Transaction[];
}
