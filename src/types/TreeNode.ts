export type UserPermission = {
  id: number;
  access: number;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export type RolePermission = {
  id: number;
  access: number;
  role: {
    name: string;
  };
}

export type TreeNode = {
  id?: number;
  name: string;
  path: string;
  type: "file" | "folder" | "add";
  children?: TreeNode[];
  userPermissions: UserPermission[];
  rolePermissions: RolePermission[];
  requesterAccess: number;
}
