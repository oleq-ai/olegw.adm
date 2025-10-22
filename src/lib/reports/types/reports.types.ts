export interface PullPaymentsIn {
  date: string;
  reference: string;
  mobile: string;
  amount: string;
}

export enum PaymentStatusEnum {
  SUCCESSFUL = "SUCCESSFUL",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
}

export type PaymentStatus = `${PaymentStatusEnum}`;

export interface PullPaymentsOut {
  date: string;
  reference: string;
  grossamount: string;
  netamount: string;
  charges: string;
  recipientaccount: string;
  status: PaymentStatus;
}

export type Tier = "Bronze" | "Silver" | "Gold" | "Platinum";
export interface DashboardSummary {
  paymentsin: number;
  paymentsout: number;
  clients: number;
  allclients: number;
  games: number;
  totaldeposits: number;
  averagedeposits: number;
  averagedepositsnewusers: number;
  activeclients: number;
  gamedata: {
    credits: number;
    debits: number;
    game: string;
    plays: number;
    revenue: number;
    wins: number;
  }[];
  tiers: {
    tier: Tier;
    users: number;
    totalBets: number;
    averageBet: number;
  }[];
  useractivity: {
    hour: string;
    totalbets: number;
    uniqueusers: number;
    totalbetamount: number;
  }[];
  paymentschart: {
    label: string;
    paymentsin: number;
    paymentsout: number;
    users: number;
  }[];
  revenuechart: {
    label: string;
    revenue: string;
  }[];
}
