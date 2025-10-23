export interface DashboardTrend {
  label: string;
  completed: number;
  failed: number;
  pending: number;
}

export interface TopMerchant {
  merchantname: string;
  revenue: number;
  transactioncount: number;
}

export interface PaymentMethod {
  method: string;
  count: number;
  percentage: number;
}

export interface RecentTransaction {
  id: number;
  transactionid: number;
  merchantname: string;
  amount: number;
  msisdn: string;
  reference: string;
  transactionmethod: string;
  createdon: string;
}

export interface DashboardData {
  totalrevenue: number;
  revenuechange: number;
  totaltransactions: number;
  transactionchange: number;
  successrate: number;
  successratechange: number;
  completedcount: number;
  failedcount: number;
  pendingcount: number;
  activemerchants: number;
  trends: DashboardTrend[];
  topmerchants: TopMerchant[];
  paymentmethods: PaymentMethod[];
  recenttransactions: RecentTransaction[];
}

export interface DashboardResponse {
  status: number;
  message: string;
  data: DashboardData;
}
