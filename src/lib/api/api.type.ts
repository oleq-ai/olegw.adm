export type FetcherOperationType =
  | "authenticate"
  | "requestotp"
  | "changepassword"
  | "createuser"
  | "getusers"
  | "getroles"
  | "createrole"
  | "pullpaymentsin"
  | "pullpaymentsout"
  | "retrywithdrawal"
  | "getdashboard"
  | "getpaymentdashboard"
  | "pullclients"
  | "pullclient"
  | "issuebonus"
  | "getstatement"
  | "depositfunds"
  | "getbonusconfig"
  | "bonusconfig"
  | "clientsettings"
  | "querypayment"
  | "gettransactions"
  | "getpendingtransaction"
  | "getpendingtransactions"
  | "getfailedtransaction"
  | "getfailedtransactions"
  | "getcompletedtransaction"
  | "getcompletedtransactions"
  | "gettransaction"
  | "getmerchant";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestOptions<TData = Record<string, any>> = {
  data: TData & { operation: FetcherOperationType; reference?: string };
  //   method?: Pick<Method, "DELETE" | "POST">;
  method?: "DELETE" | "POST";
  headers?: Record<string, string>;
  country?: string;
};
