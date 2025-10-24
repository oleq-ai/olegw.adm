export interface AllMerchantsPerformanceMerchant {
  merchantid: string;
  merchantname: string;
  merchantcode: string;
  totalrevenue: string;
  totaltransactions: string;
  successrate: string;
  accountcount: string;
}

export interface AllMerchantsPerformanceData {
  merchants: AllMerchantsPerformanceMerchant[];
}

export interface AllMerchantsPerformanceResponse {
  status: number;
  message: string;
  data: AllMerchantsPerformanceData;
}

export interface AllMerchantsPerformanceQuery {
  startdate: string;
  enddate: string;
  pagenumber: string;
  pagesize: string;
}
