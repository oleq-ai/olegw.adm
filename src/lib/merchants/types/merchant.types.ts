export interface Merchant {
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
