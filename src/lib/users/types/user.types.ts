export enum Gender {
  Male = "male",
  Female = "female",
}

export interface User {
  UKey: string;
  Username: string;
  Mobile: string;
  Firstname: string;
  Middlename: string;
  Lastname: string;
  Gender: Gender;
  City: string;
  RoleID: string;
  Email: string;
  Active: string;
  UtcTime: string;
  RoleName: string;
  modules?: string[];
}
