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

export interface MerchantDetails {
  merchantid: string;
  merchantcode: string;
  publickey: string;
  name: string;
  contactperson: string;
  email: string;
  mobile: string;
  active: string;
  createdon: string;
  createdby: string;
}

export interface MerchantDetailsResponse {
  status: number;
  message: string;
  merchantid: string;
  merchantcode: string;
  publickey: string;
  name: string;
  contactperson: string;
  email: string;
  mobile: string;
  active: string;
  createdon: string;
  createdby: string;
}
