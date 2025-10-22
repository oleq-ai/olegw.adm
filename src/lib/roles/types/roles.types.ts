export interface Role {
  id: string;
  name: string;
  description?: string;
  modules: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoleResponse {
  roleid: string;
  active: string;
  rolename: string;
  description: string;
  createdon: string;
  createdby: string;
  modules: string[];
}
