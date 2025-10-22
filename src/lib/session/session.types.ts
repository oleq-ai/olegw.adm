import { Permission } from "@/data/modules";

export interface Session {
  ukey: string;
  name: string;
  mobile: string;
  username: string;
  email: string;
  role?: string;
  modules?: Permission[];
  country: string;
}
