export type ModuleItem = {
  id: string;
  name: string;
  children?: ModuleItem[];
};

const modulesData = [
  {
    id: "dashboard",
    name: "Dashboard",
    children: [{ id: "dashboard:view", name: "View Dashboard" }],
  },
  {
    id: "merchants",
    name: "Merchant Management",
    children: [
      { id: "merchants:view", name: "View Merchants" },
      { id: "merchants:manage", name: "Manage Merchants" },
      { id: "merchants:create", name: "Create Merchants" },
      { id: "merchants:edit", name: "Edit Merchants" },
      { id: "merchants:delete", name: "Delete Merchants" },
    ],
  },
  {
    id: "accounts",
    name: "Account Management",
    children: [
      { id: "accounts:view", name: "View Accounts" },
      { id: "accounts:manage", name: "Manage Accounts" },
    ],
  },
  {
    id: "transactions",
    name: "Transaction Processing",
    children: [{ id: "transactions:view", name: "View Transactions" }],
  },
  {
    id: "users",
    name: "User Management",
    children: [
      { id: "users:view", name: "View Users" },
      { id: "users:manage", name: "Manage Users" },
      { id: "users:create", name: "Create Users" },
      { id: "users:edit", name: "Edit Users" },
      { id: "users:delete", name: "Delete Users" },
    ],
  },
  {
    id: "roles",
    name: "Role Management",
    children: [
      { id: "roles:view", name: "View Roles" },
      { id: "roles:manage", name: "Manage Roles" },
      { id: "roles:create", name: "Create Roles" },
      { id: "roles:edit", name: "Edit Roles" },
      { id: "roles:delete", name: "Delete Roles" },
    ],
  },
] as const;

export type Permission =
  | (typeof modulesData)[number]["children"][number]["id"]
  | "*";

export const moduleItems: ModuleItem[] = modulesData.map((module) => ({
  id: module.id,
  name: module.name,
  children: module.children?.map((child) => ({
    id: child.id,
    name: child.name,
  })),
}));
