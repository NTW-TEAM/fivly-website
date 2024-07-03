export interface TreeNode {
  id?: number;
  name: string;
  path: string;
  type: "file" | "folder" | "add";
  children?: TreeNode[];
}
