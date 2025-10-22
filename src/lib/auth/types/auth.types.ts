import { Permission } from "@/data/modules";

export interface LoginResponse {
  status: number;
  message: string;
  ukey: string;
  firstname: string;
  middlename: string;
  lastname: string;
  mobile: string;
  username: string;
  email: string;
  roleid: string;
  rolename?: string;
  modules: Permission[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string | null;
  image: string | null;
  role: string;
  modules: Module[];
}

interface Module {
  name: string;
}

export interface VerifyResponse {
  status: number;
  message: string;
}
