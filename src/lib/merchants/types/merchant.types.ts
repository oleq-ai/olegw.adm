export interface Merchant {
  UKey: string;
  Username: string;
  Mobile: string;
  Firstname: string;
  Middlename: string;
  Lastname: string;
  Gender: string;
  City: string;
  RoleID: string;
  Email: string;
  Active: string;
  UtcTime: string;
  RoleName: string;
  modules: string[];
}

export interface MerchantResponse {
  status: number;
  data: Merchant[];
  message: string;
}
