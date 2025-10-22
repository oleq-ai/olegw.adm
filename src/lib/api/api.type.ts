export type FetcherOperationType =
  | "authenticate"
  | "requestotp"
  | "changepassword"
  | "createuser"
  | "getusers"
  | "getroles"
  | "createrole"
  | "savegame"
  | "getgames"
  | "pullpaymentsin"
  | "pullpaymentsout"
  | "retrywithdrawal"
  | "getdashboard"
  | "pullclients"
  | "pullclient"
  | "issuebonus"
  | "getstatement"
  | "depositfunds"
  | "getbonusconfig"
  | "bonusconfig"
  | "getbleaderboard"
  | "clientsettings"
  | "querypayment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestOptions<TData = Record<string, any>> = {
  data: TData & { operation: FetcherOperationType; reference?: string };
  //   method?: Pick<Method, "DELETE" | "POST">;
  method?: "DELETE" | "POST";
  headers?: Record<string, string>;
  country?: string;
};
