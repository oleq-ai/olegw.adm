export interface MerchantPerformanceSummary {
  totalrevenue: string;
  totaltransactions: string;
  successrate: string;
  completedcount: string;
  failedcount: string;
  pendingcount: string;
}

export interface MerchantPerformanceAccount {
  shortcode: string;
  accountname: string;
  accountnumber: string;
  bankcode: string;
  revenue: string;
  transactioncount: string;
  successrate: string;
}

export interface MerchantPerformanceTransaction {
  id: string;
  transactionid: string;
  shortcode: string;
  amount: string;
  msisdn: string;
  firstname: string;
  lastname: string;
  reference: string;
  status: string;
  transactionmethod: string;
  transactiondate: string;
  transactiontime: string;
  createdon: string;
}

export interface MerchantPerformancePagination {
  totalrecords: string;
  currentpage: string;
  pagesize: string;
  totalpages: string;
}

export interface MerchantPerformanceData {
  merchantid: string;
  merchantname: string;
  merchantcode: string;
  summary: MerchantPerformanceSummary;
  accounts: MerchantPerformanceAccount[];
  transactions: MerchantPerformanceTransaction[];
  pagination: MerchantPerformancePagination;
}

export interface MerchantPerformanceResponse {
  status: number;
  message: string;
  data: MerchantPerformanceData;
}

export interface MerchantPerformanceQuery {
  merchantid: string;
  startdate: string;
  enddate: string;
  pagenumber: string;
  pagesize: string;
}
